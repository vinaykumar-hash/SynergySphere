import React from 'react';
import { cn } from '../../utils/cn';
import { User } from '../../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', className }) => {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg'
  };

  const bgColors = [
    'bg-gradient-to-br from-primary-500 to-primary-700',
    'bg-gradient-to-br from-green-500 to-emerald-700',
    'bg-gradient-to-br from-purple-500 to-violet-700',
    'bg-gradient-to-br from-pink-500 to-rose-700',
    'bg-gradient-to-br from-indigo-500 to-blue-700',
    'bg-gradient-to-br from-red-500 to-red-700',
    'bg-gradient-to-br from-yellow-500 to-orange-700',
    'bg-gradient-to-br from-teal-500 to-cyan-700'
  ];

  const colorIndex = user.id.charCodeAt(0) % bgColors.length;
  const bgColor = bgColors[colorIndex];

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={cn(
          'rounded-full object-cover ring-2 ring-dark-700',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center text-white font-medium shadow-lg',
        sizes[size],
        bgColor,
        className
      )}
    >
      {user.initials}
    </div>
  );
};

export { Avatar };