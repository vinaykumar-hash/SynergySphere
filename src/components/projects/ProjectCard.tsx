import React from 'react';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const progressPercentage = project.taskCount > 0 
    ? Math.round((project.completedTasks / project.taskCount) * 100)
    : 0;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-primary-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-gray-600';
  };

  return (
    <Card 
      className="p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:border-primary-600/50"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Progress</span>
          <span className="text-sm text-gray-400">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 shadow-sm ${getProgressColor(progressPercentage)}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <CheckCircle2 size={16} />
            <span>{project.completedTasks}/{project.taskCount} tasks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{project.members.length} members</span>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.members.slice(0, 4).map((member) => (
            <Avatar
              key={member.id}
              user={member}
              size="sm"
              className="ring-2 ring-dark-800"
            />
          ))}
          {project.members.length > 4 && (
            <div className="w-6 h-6 bg-dark-700 rounded-full flex items-center justify-center text-xs text-gray-300 font-medium ring-2 ring-dark-800">
              +{project.members.length - 4}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Calendar size={12} />
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};

export { ProjectCard };