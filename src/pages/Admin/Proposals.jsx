import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/Layout.jsx';
import { useProposals } from '../../hooks/useProposals.js';
import { TECH_TAGS } from '../../utils/techTags.js';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card.jsx';
import Button from '../../components/ui/button.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog.jsx';
import { Skeleton } from '../../components/ui/skeleton.jsx';

const AdminProposals = () => {
  const { proposals, loading, error, createProposalWithAssets, updateStatus, updateProposal } = useProposals();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTags, setEditTags] = useState([]);
  const [editSaving, setEditSaving] = useState(false);

  function toggleTag(tag) {
    setSelectedTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createProposalWithAssets({
        title,
        description,
        techTags: selectedTags,
        imageFiles,
        pdfFiles,
        inviteEmail: inviteEmail.trim() || undefined
      });
      setTitle('');
      setDescription('');
      setInviteEmail('');
      setSelectedTags([]);
      setImageFiles([]);
      setPdfFiles([]);
      // Limpa inputs de arquivo manualmente se necessário
      const imgInput = document.getElementById('proposal-images');
      const pdfInput = document.getElementById('proposal-pdfs');
      if (imgInput) imgInput.value = '';
      if (pdfInput) pdfInput.value = '';
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function cycleStatus(p) {
    // simples ciclo: draft -> sent -> approved -> draft
    const order = ['draft','sent','approved'];
    const idx = order.indexOf(p.status);
    const next = order[(idx + 1) % order.length];
    try { await updateStatus(p.id, next); } catch (err) { console.error(err); }
  }

  function openEdit(p) {
    setEditing(p);
    setEditTitle(p.title);
    setEditDescription(p.description || '');
    setEditTags(p.tech_tags || []);
  }

  function toggleEditTag(tag) {
    setEditTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]);
  }

  async function submitEdit() {
    if (!editing) return;
    setEditSaving(true);
    try {
      await updateProposal(editing.id, { title: editTitle, description: editDescription, tech_tags: editTags });
      setEditing(null);
    } catch (e) { console.error(e); } finally { setEditSaving(false); }
  }

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin - Propostas</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-2xl">
        <div className="flex-1 space-y-2">
          <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar título ou descrição" />
          <div className="flex gap-2 text-xs items-center">
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-slate-800 border border-white/20 rounded px-2 py-2 text-xs">
              <option value=''>Status (todos)</option>
              <option value='draft'>draft</option>
              <option value='sent'>sent</option>
              <option value='approved'>approved</option>
              <option value='rejected'>rejected</option>
            </select>
            {statusFilter && <Button variant='outline' className='h-auto px-2 py-1 text-xs' onClick={()=>setStatusFilter('')}>Limpar</Button>}
          </div>
        </div>
      </div>
      <Card className="mb-6 max-w-2xl">
        <CardHeader>
          <CardTitle>Nova Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título" />
          <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Descrição" rows={5} />
          <Input type="email" value={inviteEmail} onChange={(e)=>setInviteEmail(e.target.value)} placeholder="E-mail para convidar (opcional)" />
          <div>
            <p className="text-xs mb-2 opacity-70">Tecnologias (clique para selecionar):</p>
            <div className="flex flex-wrap gap-2">
              {TECH_TAGS.map(tag => (
                <Button
                  type="button"
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="text-xs px-3 py-1 h-auto"
                  onClick={()=>toggleTag(tag)}
                >{tag}</Button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <p className="text-[10px] mt-1 opacity-60">Selecionadas: {selectedTags.join(', ')}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs opacity-70" htmlFor="proposal-images">Imagens (PNG/JPG)</label>
              <Input id="proposal-images" type="file" multiple accept="image/*" onChange={(e)=>setImageFiles([...e.target.files])} className="file:mr-2 file:py-1 file:px-2 file:border file:border-white/20 file:text-xs file:bg-slate-700 file:text-white" />
            </div>
            <div>
              <label className="text-xs opacity-70" htmlFor="proposal-pdfs">Documentos PDF</label>
              <Input id="proposal-pdfs" type="file" multiple accept="application/pdf" onChange={(e)=>setPdfFiles([...e.target.files])} className="file:mr-2 file:py-1 file:px-2 file:border file:border-white/20 file:text-xs file:bg-slate-700 file:text-white" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleCreate} disabled={saving}>{saving ? 'Salvando...' : 'Criar Proposta'}</Button>
        </CardFooter>
      </Card>
      {error && <p className="text-sm text-red-400">Erro: {error}</p>}
      {loading && (
        <div className="space-y-3 max-w-2xl">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}
      {!loading && (
      <ul className="space-y-3">
        {filteredProposals.map(p => (
          <li key={p.id}>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex-1 truncate">{p.title}</CardTitle>
                <Badge variant={p.status === 'approved' ? 'success' : p.status === 'sent' ? 'outline' : 'default'}>{p.status}</Badge>
              </CardHeader>
              <CardContent>
                {p.description && <p className="text-xs opacity-80 leading-relaxed">{p.description}</p>}
                {p.tech_tags && p.tech_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tech_tags.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                  </div>
                )}
                {(p.images && p.images.length > 0) && (
                  <div className="flex gap-2 overflow-x-auto py-1">
                    {p.images.slice(0,4).map(img => (
                      <img key={img} src={img} alt="img" className="h-12 w-12 object-cover rounded" />
                    ))}
                  </div>
                )}
                {(p.documents && p.documents.length > 0) && (
                  <div className="flex flex-col gap-1">
                    {p.documents.slice(0,3).map(doc => (
                      <a key={doc} href={doc} target="_blank" rel="noreferrer" className="text-[10px] underline text-verde-vr truncate">PDF</a>
                    ))}
                  </div>
                )}
                {p.invited_email && (
                  <p className="text-[10px] opacity-60">Convidado: {p.invited_email}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="subtle" className="text-xs px-3 py-1 h-auto" onClick={()=>cycleStatus(p)}>Ciclo Status</Button>
                <Button variant="outline" className="text-xs px-3 py-1 h-auto" as-child='true'>
                  <a href={`/proposal/${p.id}`}>Abrir</a>
                </Button>
                <Dialog open={editing?.id === p.id} onOpenChange={(open)=> { if (open) openEdit(p); else setEditing(null); }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-xs px-3 py-1 h-auto">Editar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Proposta</DialogTitle>
                      <DialogDescription>Atualize título, descrição e tecnologias.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Input value={editTitle} onChange={e=>setEditTitle(e.target.value)} placeholder="Título" />
                      <Textarea value={editDescription} onChange={e=>setEditDescription(e.target.value)} placeholder="Descrição" rows={4} />
                      <div>
                        <p className="text-xs mb-2 opacity-70">Tecnologias:</p>
                        <div className="flex flex-wrap gap-2">
                          {TECH_TAGS.map(tag => (
                            <Button
                              key={tag}
                              type="button"
                              variant={editTags.includes(tag) ? 'default' : 'outline'}
                              className="text-xs px-3 py-1 h-auto"
                              onClick={()=>toggleEditTag(tag)}
                            >{tag}</Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" type="button" onClick={()=>setEditing(null)} className="text-xs h-auto px-3 py-1">Cancelar</Button>
                        <Button type="button" onClick={submitEdit} disabled={editSaving} className="text-xs h-auto px-3 py-1">{editSaving ? 'Salvando...' : 'Salvar'}</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </li>
        ))}
        {(!loading && filteredProposals.length === 0) && <li className="text-sm opacity-70">Nenhuma proposta encontrada.</li>}
      </ul>
      )}
    </div>
    </DashboardLayout>
  );
};

export default AdminProposals;
