import React from 'react';

const StatsCard = ({ title, value, description, accent = 'verde-vr', onClick }) => {
  const clickable = typeof onClick === 'function';
  const common = "group relative rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur p-4 hover:border-verde-vr transition-colors";
  const className = clickable ? `${common} cursor-pointer` : common;
  const content = (
    <>
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        <div className={`w-2 h-2 rounded-full bg-${accent}`}></div>
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
      {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
    </>
  );
  if (clickable) {
    return (
      <div role="button" tabIndex={0} className={className} onClick={onClick} onKeyDown={(e)=>{ if (e.key==='Enter') onClick(); }}>
        {content}
      </div>
    );
  }
  return <div className={className}>{content}</div>;
};

export default StatsCard;
