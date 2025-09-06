import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { CreateProjectModal } from '../components/projects/CreateProjectModal';
import { Button } from '../components/ui/Button';

interface ProjectsPageProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onProjectSelect }) => {
  const { projects } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId: string) => {
    onProjectSelect(projectId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-300 mt-1">
            Manage your team projects and track progress
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-dark-800 text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" size="md">
          <Filter size={18} className="mr-2" />
          Filter
        </Button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {projects.length === 0 ? 'No projects yet' : 'No projects found'}
          </h3>
          <p className="text-gray-300 mb-6">
            {projects.length === 0 
              ? 'Create your first project to get started with team collaboration.'
              : 'Try adjusting your search terms or create a new project.'
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={18} className="mr-2" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export { ProjectsPage };