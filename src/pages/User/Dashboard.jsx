import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/Layout.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import { useDashboardStats } from '../../hooks/useDashboardStats.js';
import { useProposals } from '../../hooks/useProposals.js';
import Button from '../../components/ui/button.jsx';
import { Badge } from '../../components/ui/badge.jsx';

const UserDashboard = () => {
  const { stats, loading, error } = useDashboardStats();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tab = params.get('tab') || 'overview';
  const { proposals, loading: loadingProps } = useProposals();
  const cards = [
    { title: 'Minhas Propostas', value: stats.proposals, description: 'Criadas / visíveis' },
    { title: 'Pagamentos', value: stats.payments, description: 'Registros pessoais' },
    { title: 'Tickets', value: stats.tickets, description: 'Meus tickets' },
    { title: 'Mensagens Hoje', value: stats.messagesToday, description: 'Atividade do dia' },
  ];
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Meu Painel</h1>
        <div className="flex gap-2">
          <Button variant={tab === 'overview' ? 'default':'outline'} className="text-xs h-auto px-3 py-1" onClick={()=>navigate('/dashboard')}>Overview</Button>
          <Button variant={tab === 'propostas' ? 'default':'outline'} className="text-xs h-auto px-3 py-1" onClick={()=>navigate('/dashboard?tab=propostas')}>Minhas Propostas</Button>
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
            <h2 className="text-lg font-medium mb-2">Resumo</h2>
            <div className="rounded-lg border border-white/10 p-4 text-sm text-slate-400">Nada por enquanto.</div>
          </section>
        </>
      )}
      {tab === 'propostas' && (
        <section className="mt-4">
          <h2 className="text-lg font-medium mb-3">Minhas Propostas</h2>
          {loadingProps && <p className="text-xs text-slate-400">Carregando propostas...</p>}
          {!loadingProps && proposals.length === 0 && (
            <div className="text-sm text-slate-400 border border-white/10 rounded p-4">Nenhuma proposta ainda.</div>
          )}
          <ul className="space-y-3">
            {proposals.map(p => (
              <li key={p.id} className="border border-white/10 rounded-lg p-4 bg-slate-900/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link to={`/proposal/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
                    {p.description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>}
                    {p.tech_tags && p.tech_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tech_tags.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                      </div>
                    )}
                  </div>
                  <Badge variant={p.status === 'approved' ? 'success' : p.status === 'sent' ? 'outline' : 'default'}>{p.status}</Badge>
                </div>
                {(p.images && p.images.length > 0) && (
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {p.images.slice(0,4).map(img => <img key={img} alt="img" src={img} className="h-12 w-12 object-cover rounded" />)}
                  </div>
                )}
                {(p.documents && p.documents.length > 0) && (
                  <div className="flex flex-col gap-1 mt-2">
                    {p.documents.slice(0,3).map(doc => <a key={doc} href={doc} target="_blank" rel="noreferrer" className="text-[10px] text-verde-vr underline">PDF</a>)}
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
