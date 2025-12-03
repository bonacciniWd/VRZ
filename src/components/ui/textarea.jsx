import React from 'react';
import { cn } from './utils';

export const Textarea = React.forwardRef(function Textarea({ className='', ...props }, ref) {
  return <textarea ref={ref} className={cn('w-full bg-slate-800 border border-white/20 rounded px-3 py-2 text-sm focus:border-verde-vr focus:ring-0 resize-none', className)} {...props} />;
});
