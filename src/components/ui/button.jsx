import React from 'react';
import { cn } from './utils';

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-verde-vr/50 disabled:opacity-50 disabled:pointer-events-none';
const variants = {
  default: 'bg-verde-vr text-black hover:bg-verde-vr/90',
  outline: 'border border-white/20 bg-transparent text-slate-200 hover:border-verde-vr hover:text-white',
  subtle: 'bg-slate-800/60 text-slate-200 hover:bg-slate-700',
};

export function Button({ variant='default', className='', ...props }) {
  return <button className={cn(base, variants[variant] || variants.default, className)} {...props} />;
}

export default Button;
