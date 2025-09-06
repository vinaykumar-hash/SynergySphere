import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

function App() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setCurrentView('projects');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view !== 'project-detail') {
      setSelectedProjectId(null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'projects':
        return <ProjectsPage onProjectSelect={handleProjectSelect} />;
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetailPage 
            projectId={selectedProjectId} 
            onBack={handleBackToProjects}
          />
        ) : (
          <ProjectsPage onProjectSelect={handleProjectSelect} />
        );
      case 'teams':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Teams</h2>
            <p className="text-gray-300">Team management features coming soon!</p>
          </div>
        );
      case 'discussions':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Discussions</h2>
            <p className="text-gray-300">Discussion features coming soon!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-300">Settings panel coming soon!</p>
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="flex">
        <Sidebar 
          currentView={currentView} 
          onViewChange={handleViewChange}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <MobileBottomNav 
        currentView={currentView}
        onViewChange={handleViewChange}
      />
    </div>
  );
}

export default App;