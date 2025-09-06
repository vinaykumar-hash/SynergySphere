import React, { useState } from 'react';
import { Bell, Menu, Plus, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) return null;

  return (
    <nav className="bg-dark-800 border-b border-dark-700 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo and Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="hidden sm:block text-xl font-bold text-white">SynergySphere</h1>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md ml-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects, tasks..."
                className="w-full pl-12 pr-4 py-2 bg-dark-900 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile search button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors">
            <Search size={20} />
          </button>

          {/* Quick create button */}
          <Button size="sm" className="hidden sm:flex">
            <Plus size={16} className="mr-1" />
            Create
          </Button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-800 rounded-3xl shadow-2xl border border-dark-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-dark-700">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-400 text-sm">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-primary-900/20 border-l-2 border-l-primary-500' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-2xl hover:bg-dark-700 transition-colors"
            >
              <Avatar user={user} />
              <span className="hidden sm:block text-sm font-medium text-gray-200">
                {user.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-3xl shadow-2xl border border-dark-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-dark-700">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <button
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };