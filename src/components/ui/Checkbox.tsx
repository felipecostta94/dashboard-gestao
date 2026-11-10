import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 accent-indigo-600 cursor-pointer',
            className
          )}
          {...props}
        />
        {label && <span className="text-xs text-slate-300">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';