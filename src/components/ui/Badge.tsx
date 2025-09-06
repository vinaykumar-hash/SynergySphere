import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  size = 'sm', 
  children, 
  className 
}) => {
  const variants = {
    default: 'bg-dark-700 text-gray-300 border border-dark-600',
    success: 'bg-green-900/50 text-green-300 border border-green-700',
    warning: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
    danger: 'bg-red-900/50 text-red-300 border border-red-700',
    info: 'bg-primary-900/50 text-primary-300 border border-primary-700'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-2xl',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };