import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center mb-4 shadow-2xl shadow-primary-500/25">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SynergySphere</h1>
          <p className="text-gray-300">
            {isLogin 
              ? 'Welcome back! Sign in to your account' 
              : 'Join SynergySphere and start collaborating'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-dark-800 rounded-3xl shadow-2xl p-8 border border-dark-700">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400">
          <p>© 2024 SynergySphere. Built for seamless team collaboration.</p>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };