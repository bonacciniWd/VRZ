import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext.jsx';

// Nav items depend on role to avoid apontar para a mesma página.
function getNavItems(role) {
  if (role === 'admin') {
    return [
      { label: 'Overview', to: '/admin', roles: ['admin'] },
      { label: 'Propostas', to: '/admin/proposals', roles: ['admin'] },
      { label: 'Chats', to: '/admin/chats', roles: ['admin'] },
      { label: 'Tickets', to: '/admin/tickets', roles: ['admin'] },
    ];
  }
  return [
    { label: 'Overview', to: '/dashboard', roles: ['user'] },
    { label: 'Minhas Propostas', to: '/dashboard?tab=propostas', roles: ['user'] },
    { label: 'Meus Tickets', to: '/tickets', roles: ['user','admin'] },
  ];
}

const Sidebar = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'user';
  const location = useLocation();
  const items = getNavItems(role);
  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-white/10 bg-slate-900/70 backdrop-blur-xl">
      <div className="px-4 py-4 border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">Painel</h1>
        <p className="text-xs text-slate-400">Role: <span className="text-verde-vr">{role}</span></p>
      </div>
      <nav className="flex-1 py-4 space-y-1">
        {items.filter(i => i.roles.includes(role)).map(item => {
          const active = location.pathname === item.to || (item.to.includes('?') && location.pathname + location.search === item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`mx-3 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                ${active ? 'bg-verde-vr text-black shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 text-xs text-slate-500 border-t border-white/10">
        © {new Date().getFullYear()} VRZ
      </div>
    </aside>
  );
};

export default Sidebar;
