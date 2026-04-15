'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
