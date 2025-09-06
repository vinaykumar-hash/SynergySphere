import React from 'react';
import { Home, FolderOpen, Users, MessageCircle, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 bg-dark-800 border-r border-dark-700">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    'group flex items-center px-3 py-3 text-sm font-medium rounded-2xl w-full transition-all duration-200',
                    currentView === item.id
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'mr-3 flex-shrink-0 h-5 w-5 transition-all duration-200',
                      currentView === item.id
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-gray-300'
                    )}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };