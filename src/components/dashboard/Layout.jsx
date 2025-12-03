import React from 'react';
import Sidebar from './Sidebar.jsx';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 px-4 md:px-8 py-6 space-y-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
