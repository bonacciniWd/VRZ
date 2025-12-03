import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { cn } from './utils';
import { X } from 'lucide-react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className='', children, ...props }) {
  return (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <DialogPrimitive.Content className={cn('fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-lg border border-white/10 bg-slate-900 p-5 shadow-xl focus:outline-none', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 inline-flex items-center justify-center rounded-sm text-slate-400 hover:text-white focus:outline-none">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className='', children }) {
  return <div className={cn('mb-4 space-y-1', className)}>{children}</div>;
}
export function DialogTitle({ className='', children }) {
  return <h2 className={cn('text-lg font-semibold tracking-tight', className)}>{children}</h2>;
}
export function DialogDescription({ className='', children }) {
  return <p className={cn('text-sm text-slate-400', className)}>{children}</p>;
}

export function DialogFooter({ className='', children }) {
  return <div className={cn('flex justify-end gap-3 mt-6', className)}>{children}</div>;
}
