import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/Layout.jsx';
import { useTickets } from '../hooks/useTickets.js';
import Button from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Input } from '../components/ui/input.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog.jsx';

const statusColor = (s) => {
  if (s === 'resolved') return 'success';
  if (s === 'in_progress') return 'outline';
  return 'default';
};

const TicketsPage = () => {
  const { tickets, loading, error, createTicket, updateTicketStatus, addTicketMessage, fetchTicketMessages } = useTickets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [creating, setCreating] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setCreating(true);
    try {
      await createTicket({ proposal_id: null, title, description, priority });
      setTitle('');
      setDescription('');
      setPriority('normal');
    } catch (err) { console.error(err); } finally { setCreating(false); }
  }

  async function openTicket(t) {
    setActiveTicket(t);
    setLoadingMessages(true);
    try {
      const data = await fetchTicketMessages(t.id);
      setMessages(data);
    } catch (e) { console.error(e); } finally { setLoadingMessages(false); }
  }

  async function sendMessage() {
    if (!activeTicket || !messageText.trim()) return;
    try {
      const m = await addTicketMessage(activeTicket.id, messageText.trim());
      setMessages(prev => [...prev, m]);
      setMessageText('');
    } catch (e) { console.error(e); }
  }

  async function cycleStatus(t) {
    const order = ['open','in_progress','resolved','closed'];
    const idx = order.indexOf(t.status);
    const next = order[(idx + 1) % order.length];
    try { await updateTicketStatus(t.id, next); } catch (e) { console.error(e); }
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Meus Tickets</h1>
      <div className="max-w-xl mb-6 border border-white/10 rounded-lg p-4 bg-slate-900/60">
        <h2 className="text-lg font-medium mb-3">Novo Ticket</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" />
          <Textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="Descrição do problema" />
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="priority">Prioridade:</label>
            <select id="priority" value={priority} onChange={e=>setPriority(e.target.value)} className="bg-slate-800 border border-white/20 rounded px-2 py-1 text-xs">
              <option value="low">low</option>
              <option value="normal">normal</option>
              <option value="high">high</option>
              <option value="urgent">urgent</option>
            </select>
          </div>
          <Button type="submit" disabled={creating}>{creating ? 'Criando...' : 'Criar Ticket'}</Button>
        </form>
      </div>
      {error && <p className="text-sm text-red-400">Erro: {error}</p>}
      {loading && <p className="text-sm opacity-70">Carregando tickets...</p>}
      {!loading && tickets.length === 0 && <p className="text-sm opacity-70">Nenhum ticket ainda.</p>}
      <ul className="space-y-3 max-w-3xl">
        {tickets.map(t => (
          <li key={t.id} className="border border-white/10 rounded-lg p-4 bg-slate-900/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{t.title}</h3>
                {t.description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{t.description}</p>}
                <p className="text-[10px] mt-1 opacity-50">Prioridade: {t.priority}</p>
              </div>
              <Badge variant={statusColor(t.status)}>{t.status}</Badge>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="subtle" className="text-xs h-auto px-3 py-1" onClick={()=>cycleStatus(t)}>Status</Button>
              <Dialog open={activeTicket?.id === t.id} onOpenChange={(o)=> { if (o) openTicket(t); else setActiveTicket(null); }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-xs h-auto px-3 py-1">Mensagens</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Ticket: {t.title}</DialogTitle>
                    <DialogDescription>Status: {t.status} • Prioridade: {t.priority}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {loadingMessages && <p className="text-xs opacity-70">Carregando mensagens...</p>}
                    {!loadingMessages && messages.length === 0 && <p className="text-xs opacity-70">Nenhuma mensagem.</p>}
                    <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {messages.map(m => (
                        <li key={m.id} className="text-xs bg-slate-800/60 rounded px-2 py-1">
                          <p>{m.content}</p>
                          <p className="opacity-40 text-[10px]">{new Date(m.created_at).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                      <Textarea rows={3} value={messageText} onChange={e=>setMessageText(e.target.value)} placeholder="Escreva uma mensagem" />
                      <div className="flex justify-end">
                        <Button type="button" onClick={sendMessage} disabled={!messageText.trim()} className="text-xs h-auto px-3 py-1">Enviar</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default TicketsPage;
