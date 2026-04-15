'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]',
        variant === 'default' && 'bg-slate-800 text-slate-200',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-300',
        variant === 'warning' && 'bg-amber-500/10 text-amber-200',
        variant === 'outline' && 'border border-slate-700 text-slate-200',
        className
      )}
      {...props}
    />
  );
}
