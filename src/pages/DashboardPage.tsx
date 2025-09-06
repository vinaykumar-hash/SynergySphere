import React from 'react';
import { TrendingUp, Users, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const DashboardPage: React.FC = () => {
  const { projects, tasks } = useApp();
  const { user } = useAuth();

  if (!user) return null;

  const userTasks = tasks.filter(task => task.assignee.id === user.id);
  const completedTasks = userTasks.filter(task => task.status === 'done').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = userTasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'done'
  ).length;

  const recentTasks = userTasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Good morning, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-300 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-900/50 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-white">{projects.length}</p>
              <p className="text-gray-300">Active Projects</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-900/50 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
              <p className="text-gray-300">Tasks Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-900/50 rounded-2xl">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-white">{inProgressTasks}</p>
              <p className="text-gray-300">In Progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-900/50 rounded-2xl">
              <Users className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-white">{overdueTasks}</p>
              <p className="text-gray-300">Overdue</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Recent Tasks</h3>
          <div className="space-y-4">
            {recentTasks.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No tasks assigned to you yet.</p>
            ) : (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-2xl border border-dark-600">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      task.status === 'done' ? 'success' : 
                      task.status === 'in-progress' ? 'info' : 
                      'default'
                    }
                    size="sm"
                  >
                    {task.status === 'todo' ? 'To Do' :
                     task.status === 'in-progress' ? 'In Progress' :
                     'Done'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Project Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Project Overview</h3>
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No projects created yet.</p>
            ) : (
              projects.map((project) => {
                const progressPercentage = project.taskCount > 0 
                  ? Math.round((project.completedTasks / project.taskCount) * 100)
                  : 0;
                
                return (
                  <div key={project.id} className="p-4 bg-dark-700/50 rounded-2xl border border-dark-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <span className="text-sm text-gray-300">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-3 mb-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>{project.completedTasks}/{project.taskCount} tasks</span>
                      <div className="flex -space-x-1">
                        {project.members.slice(0, 3).map((member) => (
                          <Avatar
                            key={member.id}
                            user={member}
                            size="sm"
                            className="ring-2 ring-dark-700"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export { DashboardPage };