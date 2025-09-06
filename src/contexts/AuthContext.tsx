import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@synergysphere.com',
    initials: 'SJ'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@synergysphere.com',
    initials: 'MC'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@synergysphere.com',
    initials: 'ER'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication - in real app, this would validate against backend
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      setAuthState({
        user,
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock registration - in real app, this would create user in backend
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setAuthState({
        user: newUser,
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};