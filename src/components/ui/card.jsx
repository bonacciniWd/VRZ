import React from 'react';
import { cn } from './utils';

export function Card({ className='', children }) {
  return <div className={cn('rounded-lg border border-white/10 bg-slate-800/60 backdrop-blur-sm shadow-md', className)}>{children}</div>;
}
export function CardHeader({ className='', children }) {
  return <div className={cn('p-4 border-b border-white/10 flex items-center justify-between gap-2', className)}>{children}</div>;
}
export function CardTitle({ className='', children }) {
  return <h3 className={cn('text-sm font-semibold tracking-tight', className)}>{children}</h3>;
}
export function CardContent({ className='', children }) {
  return <div className={cn('p-4 space-y-3 text-sm', className)}>{children}</div>;
}
export function CardFooter({ className='', children }) {
  return <div className={cn('p-3 border-t border-white/10 flex items-center gap-2', className)}>{children}</div>;
}
