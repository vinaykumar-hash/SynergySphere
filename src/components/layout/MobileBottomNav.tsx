import React from 'react';
import { Home, FolderOpen, Users, MessageCircle, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MobileBottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'discussions', label: 'Chat', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 px-4 py-2 z-40 backdrop-blur-lg bg-dark-800/95">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-200 min-w-0',
                currentView === item.id
                  ? 'text-primary-400 bg-primary-900/20'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export { MobileBottomNav };