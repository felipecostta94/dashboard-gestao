import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export function Badge({
  className,
  variant = 'info',
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors';

  const variants = {
    success:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    warning:
      'border-amber-500/20 bg-amber-500/10 text-amber-400',
    danger:
      'border-rose-500/20 bg-rose-500/10 text-rose-400',
    info:
      'border-indigo-500/20 bg-indigo-500/10 text-indigo-400',
    neutral:
      'border-slate-700 bg-slate-800/60 text-slate-300',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}