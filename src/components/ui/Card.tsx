import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-dark-800 border border-dark-700',
      outlined: 'bg-dark-800 border-2 border-dark-600',
      elevated: 'bg-dark-800 shadow-2xl border border-dark-700 shadow-black/20'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl transition-all duration-200',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };