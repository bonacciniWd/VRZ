import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase.js';
import { mapTicketStatus, mapTicketPriority, mapObjectFromDB, mapObjectToDB } from '../utils/enumMapping.js';

/*
Tickets schema (real from Supabase):

CREATE TABLE public.tickets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  proposal_id uuid,
  subject text NOT NULL,          -- DB uses 'subject', not 'title'
  body text,                       -- DB uses 'body', not 'description'
  status enum NOT NULL DEFAULT 'aberto', -- aberto | em_andamento | resolvido | fechado
  priority enum NOT NULL DEFAULT 'media', -- baixa | media | alta | urgente
  created_by uuid NOT NULL,
  assigned_to uuid,
  created_at timestamptz DEFAULT now()
);

create table public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.tickets(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

Suggested RLS (after enabling row level security on both tables):
-- Tickets: users can see their own tickets; admins (role=admin in profiles) see all
create policy "select own or admin" on public.tickets for select using (
  auth.uid() = user_id OR exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "insert self" on public.tickets for insert with check ( auth.uid() = user_id );
create policy "update own or admin" on public.tickets for update using (
  auth.uid() = user_id OR exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Ticket messages: user must be ticket owner OR admin
create policy "select ticket participants" on public.ticket_messages for select using (
  exists(select 1 from public.tickets t where t.id = ticket_id and (t.user_id = auth.uid() OR exists(select 1 from public.profiles p where p.id = auth.uid() and p.role='admin')))
);
create policy "insert ticket participants" on public.ticket_messages for insert with check (
  exists(select 1 from public.tickets t where t.id = ticket_id and (t.user_id = auth.uid() OR exists(select 1 from public.profiles p where p.id = auth.uid() and p.role='admin')))
);
*/

export function useTickets({ autoSubscribe = true, userScope = 'own' } = {}) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const channelRef = useRef(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from('tickets').select('*').order('created_at', { ascending: false });
    if (userScope === 'own') {
      // Assuming RLS restricts automatically; optional explicit filter if needed
      // query = query.eq('user_id', session?.user?.id)
    }
    // Map status to DB format (EN → PT) before querying
    if (statusFilter) query = query.eq('status', mapTicketStatus.toDB(statusFilter));
    // DB uses 'subject', not 'title'
    if (search) query = query.ilike('subject', `%${search}%`);
    const { data, error: qError } = await query;
    if (qError) setError(qError.message);
    // Map all tickets from DB format (PT → EN)
    const mappedData = (data || []).map(ticket => mapObjectFromDB(ticket, {
      status: mapTicketStatus,
      priority: mapTicketPriority,
    }));
    setTickets(mappedData);
    setLoading(false);
  }, [search, statusFilter, userScope]);

  const createTicket = useCallback(async ({ proposal_id, subject, body, priority = 'normal', assigned_to = null }) => {
    // Map to DB format: title→subject, description→body, enums EN→PT
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const dbTicket = {
      proposal_id,
      subject, // DB uses 'subject'
      body,    // DB uses 'body'
      priority: mapTicketPriority.toDB(priority),
      created_by: user.id,
      user_id: user.id,
      assigned_to,
    };
    
    const { data, error: cError } = await supabase.from('tickets').insert(dbTicket).select().single();
    if (cError) throw cError;
    
    // Map back to code format (PT → EN)
    const mappedTicket = mapObjectFromDB(data, {
      status: mapTicketStatus,
      priority: mapTicketPriority,
    });
    
    setTickets(prev => [mappedTicket, ...prev]);
    return mappedTicket;
  }, []);

  const updateTicketStatus = useCallback(async (id, status) => {
    // Map status to DB format (EN → PT)
    const dbStatus = mapTicketStatus.toDB(status);
    const { data, error: uError } = await supabase.from('tickets').update({ status: dbStatus }).eq('id', id).select().single();
    if (uError) throw uError;
    
    // Map back to code format
    const mappedTicket = mapObjectFromDB(data, {
      status: mapTicketStatus,
      priority: mapTicketPriority,
    });
    
    setTickets(prev => prev.map(t => (t.id === id ? mappedTicket : t)));
    return mappedTicket;
  }, []);

  const addTicketMessage = useCallback(async (ticket_id, content) => {
    const { data, error: mError } = await supabase.from('ticket_messages').insert({ ticket_id, content }).select().single();
    if (mError) throw mError;
    return data;
  }, []);

  // Fetch messages for a ticket
  const fetchTicketMessages = useCallback(async (ticket_id) => {
    const { data, error: fmError } = await supabase.from('ticket_messages').select('*').eq('ticket_id', ticket_id).order('created_at');
    if (fmError) throw fmError;
    return data || [];
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!autoSubscribe) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    const channel = supabase.channel('tickets-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, payload => {
        // Map realtime payloads from DB format (PT → EN)
        if (payload.eventType === 'INSERT') {
          const mappedTicket = mapObjectFromDB(payload.new, {
            status: mapTicketStatus,
            priority: mapTicketPriority,
          });
          setTickets(prev => {
            const exists = prev.some(t => t.id === mappedTicket.id);
            return exists ? prev : [mappedTicket, ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          const mappedTicket = mapObjectFromDB(payload.new, {
            status: mapTicketStatus,
            priority: mapTicketPriority,
          });
          setTickets(prev => prev.map(t => (t.id === mappedTicket.id ? mappedTicket : t)));
        } else if (payload.eventType === 'DELETE') {
          setTickets(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .subscribe();
    channelRef.current = channel;
    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [autoSubscribe]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    fetchTickets,
    createTicket,
    updateTicketStatus,
    addTicketMessage,
    fetchTicketMessages,
  };
}

export default useTickets;
