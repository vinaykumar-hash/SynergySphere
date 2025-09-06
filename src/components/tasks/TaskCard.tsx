import React from 'react';
import { Calendar, Flag, User } from 'lucide-react';
import { Task, TaskStatus } from '../../types';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      'todo': { variant: 'default' as const, label: 'To Do' },
      'in-progress': { variant: 'info' as const, label: 'In Progress' },
      'done': { variant: 'success' as const, label: 'Done' }
    };
    
    return variants[status] || variants.todo;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const statusBadge = getStatusBadge(task.status);

  return (
    <Card 
      className="p-4 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-primary-600/30"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-base font-semibold text-white mb-1 line-clamp-2">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-300 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <Flag size={16} className={getPriorityColor(task.priority)} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant={statusBadge.variant} size="sm">
            {statusBadge.label}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Calendar size={12} />
            <span className={isOverdue ? 'text-red-400 font-medium' : ''}>
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Avatar user={task.assignee} size="sm" />
      </div>
    </Card>
  );
};

export { TaskCard };