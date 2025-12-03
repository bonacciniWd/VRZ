import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/Layout.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import { useDashboardStats } from '../../hooks/useDashboardStats.js';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { stats, loading, error } = useDashboardStats();
  const cards = [
    { title: 'Propostas', value: stats.proposals, description: 'Total criadas' },
    { title: 'Pagamentos', value: stats.payments, description: 'Registros na base' },
    { title: 'Tickets', value: stats.tickets, description: 'Abertos / existentes' },
    { title: 'Mensagens Hoje', value: stats.messagesToday, description: 'De visitantes', onClick: () => navigate('/admin/chats') },
  ];
  return (
    <DashboardLayout>
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Visão Geral</h1>
      {loading && <p className="text-xs text-slate-400 mt-2">Atualizando...</p>}
      {error && <p className="text-xs text-red-400 mt-2">Erro: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {cards.map(s => <StatsCard key={s.title} {...s} />)}
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-medium mb-2">Atividade Recente</h2>
        <div className="rounded-lg border border-white/10 p-4 text-sm text-slate-400">Nenhuma atividade ainda.</div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
