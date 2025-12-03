import React from 'react';
import { cn } from './utils';

export function Skeleton({ className='' }) {
  return <div className={cn('animate-pulse rounded-md bg-slate-700/40', className)} />;
}
