'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20 hover:brightness-110',
        variant === 'secondary' && 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800',
        variant === 'ghost' && 'bg-transparent text-slate-100 hover:bg-slate-800',
        className
      )}
      {...props}
    />
  );
}
