import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../app/AuthContext.jsx';
import { mapProposalStatus, mapObjectFromDB, mapObjectToDB } from '../utils/enumMapping.js';
import { currencyToCents, centsToCurrency } from '../utils/currency.js';

/*
Proposals schema (real from Supabase):

CREATE TABLE public.proposals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),  -- NEW: Amount in cents
  currency text NOT NULL DEFAULT 'BRL',
  status enum NOT NULL DEFAULT 'rascunho',  -- rascunho | enviada | aprovada | rejeitada
  tech_tags text[] DEFAULT '{}',
  images jsonb DEFAULT '[]',
  documents jsonb DEFAULT '[]',
  invited_email text,
  invited_user uuid,
  created_at timestamptz DEFAULT now(),
  
  FOREIGN KEY (user_id) REFERENCES profiles(id),
  FOREIGN KEY (invited_user) REFERENCES profiles(id)
);
*/
export function useProposals({ autoSubscribe = true } = {}) {
  const { session } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProposals = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    
    // Map from DB format (PT → EN) and add amount in currency units
    const mappedData = (data || []).map(proposal => ({
      ...mapObjectFromDB(proposal, { status: mapProposalStatus }),
      amount: centsToCurrency(proposal.amount_cents), // Add computed 'amount' field
    }));
    
    setProposals(mappedData);
    setLoading(false);
  }, [session]);

  const createProposal = useCallback(async ({ title, description, amount = 0 }) => {
    if (!session) throw new Error('Not authenticated');
    
    const insert = {
      user_id: session.user.id,
      title,
      description,
      amount_cents: currencyToCents(amount),
      status: mapProposalStatus.toDB('sent'), // Map to 'enviada'
    };
    
    const { data, error: err } = await supabase.from('proposals').insert(insert).select().single();
    if (err) throw new Error(err.message);
    
    // Map back to code format
    const mappedProposal = {
      ...mapObjectFromDB(data, { status: mapProposalStatus }),
      amount: centsToCurrency(data.amount_cents),
    };
    
    setProposals(p => [mappedProposal, ...p]);
    return mappedProposal;
  }, [session]);

  // Criação avançada com assets e convite
  const createProposalWithAssets = useCallback(async ({ title, description, amount = 0, techTags = [], imageFiles = [], pdfFiles = [], inviteEmail, installments }) => {
    if (!session) throw new Error('Not authenticated');
    
    // 0. Tenta encontrar usuário existente pelo email para vincular imediatamente
    let invitedUserId = null;
    if (inviteEmail) {
      const { data: profiles } = await supabase.from('profiles').select('id').eq('email', inviteEmail).limit(1);
      if (profiles && profiles.length > 0) {
        invitedUserId = profiles[0].id;
      }
    }

    // 1. Insere proposta inicial
    const baseInsert = {
      user_id: session.user.id,
      title,
      description,
      amount_cents: currencyToCents(amount),
      status: mapProposalStatus.toDB('sent'),
      tech_tags: techTags,
      invited_email: inviteEmail || null,
      invited_user: invitedUserId, // Vincula usuário se encontrado
      installments: installments || null,
    };
    const { data: created, error: createErr } = await supabase.from('proposals').insert(baseInsert).select().single();
    if (createErr) throw new Error(createErr.message);
    const id = created.id;
    const uploadedImages = [];
    const uploadedDocs = [];
    // 2. Upload assets (imagens)
    console.log('Iniciando upload de imagens:', imageFiles.length);
    for (const file of imageFiles) {
      const path = `proposals/${id}/images/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      console.log('Upload imagem:', path);
      const { error: upErr } = await supabase.storage.from('data').upload(path, file, { upsert: false });
      if (upErr) {
        console.error('Erro upload imagem:', upErr);
        // Opcional: lançar erro ou continuar
        // throw new Error(`Falha no upload de imagem: ${upErr.message}`);
      } else {
        const { data: pub } = supabase.storage.from('data').getPublicUrl(path);
        console.log('Imagem URL:', pub.publicUrl);
        uploadedImages.push(pub.publicUrl);
      }
    }
    // 3. Upload documentos PDF
    console.log('Iniciando upload de docs:', pdfFiles.length);
    for (const file of pdfFiles) {
      const path = `proposals/${id}/documents/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      console.log('Upload doc:', path);
      const { error: upErr } = await supabase.storage.from('data').upload(path, file, { upsert: false });
      if (upErr) {
        console.error('Erro upload documento:', upErr);
        throw new Error(`Falha no upload de documento: ${upErr.message}`);
      } else {
        const { data: pub } = supabase.storage.from('data').getPublicUrl(path);
        console.log('Doc URL:', pub.publicUrl);
        uploadedDocs.push(pub.publicUrl);
      }
    }
    
    console.log('Atualizando proposta com:', { images: uploadedImages, documents: uploadedDocs });
    
    // 4. Atualiza proposta com arrays
    const { data: updated, error: updErr } = await supabase
      .from('proposals')
      .update({ images: uploadedImages, documents: uploadedDocs })
      .eq('id', id)
      .select()
      .single();
    
    if (updErr) {
        console.error('Erro update proposta:', updErr);
        throw new Error(updErr.message);
    }
    console.log('Proposta atualizada:', updated);
    
    // Map back to code format
    const mappedProposal = {
      ...mapObjectFromDB(updated, { status: mapProposalStatus }),
      amount: centsToCurrency(updated.amount_cents),
    };

    // 5. Convite / magic link (se email fornecido e usuário não existir)
    if (inviteEmail && !invitedUserId) {
      // Chama edge function para gerar magic link (precisa ser criada no backend)
      try {
        await fetch('/functions/v1/invite-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: inviteEmail, proposalId: id })
        });
      } catch (e) {
        console.warn('Falha ao chamar invite-user:', e.message);
      }
    } else if (invitedUserId) {
        // TODO: opcional inserir notification para o usuário existente
        // await supabase.from('notifications').insert({ user_id: invitedUserId, type: 'proposal_invite', proposal_id: id });
    }

    setProposals(p => [mappedProposal, ...p]);
    return mappedProposal;
  }, [session]);

  const updateStatus = useCallback(async (id, status) => {
    // Map status to DB format (EN → PT)
    const dbStatus = mapProposalStatus.toDB(status);
    
    const { data, error: err } = await supabase
      .from('proposals')
      .update({ status: dbStatus })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (err) throw new Error(err.message);
    if (!data) throw new Error('Proposta não encontrada ou sem permissão para atualizar.');
    // Map back to code format
    const mappedProposal = {
      ...mapObjectFromDB(data, { status: mapProposalStatus }),
      amount: centsToCurrency(data.amount_cents),
    };
    setProposals(p => p.map(item => item.id === id ? mappedProposal : item));
    return mappedProposal;
  }, []);

  const updateProposal = useCallback(async (id, changes) => {
    const updateData = { ...changes };
    
    // Convert amount to amount_cents if provided
    if (updateData.amount !== undefined) {
      updateData.amount_cents = currencyToCents(updateData.amount);
      delete updateData.amount;
    }
    
    // Map status if provided
    if (updateData.status) {
      updateData.status = mapProposalStatus.toDB(updateData.status);
    }
    
    const { data, error: err } = await supabase
      .from('proposals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (err) throw new Error(err.message);
    
    // Map back to code format
    const mappedProposal = {
      ...mapObjectFromDB(data, { status: mapProposalStatus }),
      amount: centsToCurrency(data.amount_cents),
    };
    
    setProposals(p => p.map(item => item.id === id ? mappedProposal : item));
    return mappedProposal;
  }, []);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  useEffect(() => {
    if (!autoSubscribe) return;
    const channel = supabase.channel('proposals-changes');
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'proposals' }, payload => {
      // Map realtime payloads from DB format (PT → EN)
      if (payload.eventType === 'INSERT') {
        const mappedProposal = {
          ...mapObjectFromDB(payload.new, { status: mapProposalStatus }),
          amount: centsToCurrency(payload.new.amount_cents),
        };
        setProposals(p => {
          const exists = p.some(x => x.id === mappedProposal.id);
          return exists ? p : [mappedProposal, ...p];
        });
      } else if (payload.eventType === 'UPDATE') {
        const mappedProposal = {
          ...mapObjectFromDB(payload.new, { status: mapProposalStatus }),
          amount: centsToCurrency(payload.new.amount_cents),
        };
        setProposals(p => p.map(item => item.id === mappedProposal.id ? mappedProposal : item));
      } else if (payload.eventType === 'DELETE') {
        setProposals(p => p.filter(item => item.id !== payload.old.id));
      }
    });
    channel.subscribe();
    return () => { channel.unsubscribe(); };
  }, [autoSubscribe]);

  return { proposals, loading, error, fetchProposals, createProposal, createProposalWithAssets, updateStatus, updateProposal };
}
