import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/Layout.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import { useDashboardStats } from '../../hooks/useDashboardStats.js';
import { useProposals } from '../../hooks/useProposals.js';
import Button from '../../components/ui/button.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { FileText, Check, X, ExternalLink, Download } from 'lucide-react';

const UserDashboard = () => {
  const { stats, loading, error } = useDashboardStats();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tab = params.get('tab') || 'overview';
  const { proposals, loading: loadingProps, updateStatus } = useProposals();
  const [actionLoading, setActionLoading] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    if (!confirm(`Tem certeza que deseja ${newStatus === 'approved' ? 'aprovar' : 'rejeitar'} esta proposta?`)) return;
    setActionLoading(id);
    try {
      await updateStatus(id, newStatus);
    } catch (e) {
      console.error("Failed to update status", e);
      alert("Erro ao atualizar status: " + e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const cards = [
    { title: 'Minhas Propostas', value: stats.proposals, description: 'Criadas / visíveis' },
    { title: 'Pagamentos', value: stats.payments, description: 'Registros pessoais' },
    { title: 'Tickets', value: stats.tickets, description: 'Meus tickets' },
    { title: 'Mensagens Hoje', value: stats.messagesToday, description: 'Atividade do dia' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Meu Painel</h1>
        <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/10">
          <Button 
            variant={tab === 'overview' ? 'default':'ghost'} 
            className="text-xs h-8 px-4" 
            onClick={()=>navigate('/dashboard')}
          >
            Visão Geral
          </Button>
          <Button 
            variant={tab === 'propostas' ? 'default':'ghost'} 
            className="text-xs h-8 px-4" 
            onClick={()=>navigate('/dashboard?tab=propostas')}
          >
            Minhas Propostas
          </Button>
        </div>
      </div>

      {tab === 'overview' && (
        <>
          {loading && <p className="text-xs text-slate-400 mt-2">Atualizando...</p>}
          {error && <p className="text-xs text-red-400 mt-2">Erro: {error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {cards.map(s => <StatsCard key={s.title} {...s} />)}
          </div>
          <section className="mt-8">
            <h2 className="text-lg font-medium mb-4">Atividade Recente</h2>
            <div className="rounded-lg border border-white/10 p-8 text-center text-sm text-slate-400 bg-slate-900/30">
              Nenhuma atividade recente para exibir.
            </div>
          </section>
        </>
      )}

      {tab === 'propostas' && (
        <section className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Minhas Propostas</h2>
            <span className="text-xs text-slate-400">{proposals.length} encontrada(s)</span>
          </div>
          
          {loadingProps && (
            <div className="space-y-3">
              {[1,2].map(i => <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />)}
            </div>
          )}

          {!loadingProps && proposals.length === 0 && (
            <div className="text-sm text-slate-400 border border-white/10 rounded-lg p-8 text-center bg-slate-900/30">
              Nenhuma proposta encontrada.
            </div>
          )}

          <ul className="space-y-4">
            {proposals.map(p => (
              <li key={p.id} className="border border-white/10 rounded-xl p-5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Link to={`/proposal/${p.id}`} className="text-lg font-semibold hover:text-verde-vr transition-colors flex items-center gap-2">
                        {p.title}
                        <ExternalLink className="w-4 h-4 opacity-50" />
                      </Link>
                      <Badge variant={p.status === 'approved' ? 'success' : p.status === 'sent' ? 'outline' : p.status === 'rejected' ? 'destructive' : 'default'}>
                        {p.status === 'sent' ? 'Aguardando Aprovação' : p.status === 'approved' ? 'Aprovada' : p.status === 'rejected' ? 'Rejeitada' : p.status}
                      </Badge>
                    </div>
                    
                    {p.description && (
                      <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                        {p.description}
                      </p>
                    )}

                    {p.tech_tags && p.tech_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {p.amount !== undefined && (
                          <Badge variant="secondary" className="text-[10px] bg-slate-800 text-slate-300 border-slate-700">Valor: R$ {Number(p.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Badge>
                        )}
                        {p.installments && (
                          <Badge variant="secondary" className="text-[10px] bg-slate-800 text-slate-300 border-slate-700">Parcelamento: {p.installments}</Badge>
                        )}
                        {p.tech_tags.map(t => (
                          <Badge key={t} variant="secondary" className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 border-slate-700">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions for Sent status */}
                  {p.status === 'sent' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-400 border-green-400/20 hover:bg-green-400/10 hover:text-green-300"
                        onClick={() => handleStatusChange(p.id, 'approved')}
                        disabled={actionLoading === p.id}
                      >
                        {actionLoading === p.id ? '...' : <><Check className="w-4 h-4 mr-1" /> Aceitar</>}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-400 border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                        onClick={() => handleStatusChange(p.id, 'rejected')}
                        disabled={actionLoading === p.id}
                      >
                        {actionLoading === p.id ? '...' : <><X className="w-4 h-4 mr-1" /> Rejeitar</>}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Assets Section */}
                {( (p.images && p.images.length > 0) || (p.documents && p.documents.length > 0) ) && (
                  <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Images */}
                    {p.images && p.images.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Imagens</p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                          {p.images.map((img, idx) => (
                            <a key={idx} href={img} target="_blank" rel="noreferrer" className="block shrink-0">
                              <img src={img} alt={`Preview ${idx}`} className="h-16 w-24 object-cover rounded-md border border-white/10 hover:border-verde-vr transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    {p.documents && p.documents.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Documentos</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {p.documents.map((doc, idx) => {
                            // Try to extract filename from URL
                            const fileName = doc.split('/').pop().split('?')[0].split('-').slice(2).join('-') || `Documento ${idx + 1}`;
                            return (
                              <a 
                                key={idx} 
                                href={doc} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center gap-3 p-2 rounded-md bg-slate-800/50 border border-white/5 hover:bg-slate-800 hover:border-verde-vr/50 transition-all group"
                              >
                                <div className="p-2 rounded bg-slate-900 text-verde-vr">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-slate-300 truncate group-hover:text-white">{fileName}</p>
                                  <p className="text-[10px] text-slate-500">PDF</p>
                                </div>
                                <Download className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
