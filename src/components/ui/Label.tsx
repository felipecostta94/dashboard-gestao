import { LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block text-xs font-medium text-slate-300', className)}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';