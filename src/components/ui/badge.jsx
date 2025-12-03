import React from 'react';
import { cn } from './utils';

export function Badge({ className='', children, variant='default' }) {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    success: 'bg-verde-vr text-black',
    warning: 'bg-pink-vr text-white',
    outline: 'border border-white/20 text-slate-200'
  };
  return <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium', variants[variant] || variants.default, className)}>{children}</span>;
}
