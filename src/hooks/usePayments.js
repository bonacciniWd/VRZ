import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { mapPaymentStatus, mapObjectFromDB, mapObjectToDB } from '../utils/enumMapping.js';

/*
Payments schema (real from Supabase):

CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL,
  provider text NOT NULL,
  external_id text UNIQUE,
  amount_cents integer NOT NULL,      -- IMPORTANT: stored as cents, not decimal
  status enum NOT NULL DEFAULT 'pendente', -- pendente | processando | pago | falhou | reembolsado | cancelado
  pix_qr_code text,                   -- Pix QR code string
  pix_qr_code_base64 text,            -- Pix QR code as base64 image
  due_date timestamptz,
  raw jsonb,                          -- Store full provider response
  created_at timestamptz DEFAULT now(),
  
  NOTES:
  - No 'user_id' field (use proposal_id to link to user)
  - No 'currency' field (assume BRL)
  - No 'updated_at' field
  - Amount stored as cents (integer) to avoid float precision issues
);
*/

export function usePayments({ autoSubscribe = true, proposalId = null } = {}) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const channelRef = useRef(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from('payments').select('*').order('created_at', { ascending: false });
    if (proposalId) query = query.eq('proposal_id', proposalId);
    const { data, error: qError } = await query;
    if (qError) setError(qError.message);
    
    // Map from DB format (PT → EN)
    const mappedData = (data || []).map(payment => mapObjectFromDB(payment, {
      status: mapPaymentStatus,
    }));
    setPayments(mappedData);
    setLoading(false);
  }, [proposalId]);

  const createPayment = useCallback(async ({ proposal_id, amount, provider = 'pix', pix_qr_code = null, pix_qr_code_base64 = null, due_date = null, raw = null }) => {
    // Convert amount (in BRL) to cents
    const amount_cents = Math.round(amount * 100);
    
    const dbPayment = {
      proposal_id,
      amount_cents,
      provider,
      status: mapPaymentStatus.toDB('pending'), // Default to 'pendente'
      pix_qr_code,
      pix_qr_code_base64,
      due_date,
      raw,
    };
    
    const { data, error: cError } = await supabase.from('payments').insert(dbPayment).select().single();
    if (cError) throw cError;
    
    // Map back to code format (PT → EN)
    const mappedPayment = mapObjectFromDB(data, {
      status: mapPaymentStatus,
    });
    
    setPayments(prev => [mappedPayment, ...prev]);
    return mappedPayment;
  }, []);

  const updatePaymentStatus = useCallback(async (id, status, external_id = null, raw = null) => {
    // Map status to DB format (EN → PT)
    const updateData = { 
      status: mapPaymentStatus.toDB(status),
    };
    if (external_id !== null) updateData.external_id = external_id;
    if (raw !== null) updateData.raw = raw;
    
    const { data, error: uError } = await supabase.from('payments').update(updateData).eq('id', id).select().single();
    if (uError) throw uError;
    
    // Map back to code format
    const mappedPayment = mapObjectFromDB(data, {
      status: mapPaymentStatus,
    });
    
    setPayments(prev => prev.map(p => (p.id === id ? mappedPayment : p)));
    return mappedPayment;
  }, []);

  const fetchPaymentById = useCallback(async (id) => {
    const { data, error: fError } = await supabase.from('payments').select('*').eq('id', id).single();
    if (fError) throw fError;
    
    // Map from DB format (PT → EN)
    const mappedPayment = mapObjectFromDB(data, {
      status: mapPaymentStatus,
    });
    
    return mappedPayment;
  }, []);

  useEffect(() => {
    if (!autoSubscribe) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    const channel = supabase.channel('payments-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, payload => {
        // Map realtime payloads from DB format (PT → EN)
        if (payload.eventType === 'INSERT') {
          const mappedPayment = mapObjectFromDB(payload.new, {
            status: mapPaymentStatus,
          });
          setPayments(prev => {
            const exists = prev.some(p => p.id === mappedPayment.id);
            return exists ? prev : [mappedPayment, ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          const mappedPayment = mapObjectFromDB(payload.new, {
            status: mapPaymentStatus,
          });
          setPayments(prev => prev.map(p => (p.id === mappedPayment.id ? mappedPayment : p)));
        } else if (payload.eventType === 'DELETE') {
          setPayments(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();
    channelRef.current = channel;
    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [autoSubscribe]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    updatePaymentStatus,
    fetchPaymentById,
  };
}

export default usePayments;
