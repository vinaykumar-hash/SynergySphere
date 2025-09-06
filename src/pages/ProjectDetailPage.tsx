import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TaskCard } from '../components/tasks/TaskCard';
import { CreateTaskModal } from '../components/tasks/CreateTaskModal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onBack }) => {
  const { projects, getProjectTasks } = useApp();
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'overview' | 'discussions'>('tasks');

  const project = projects.find(p => p.id === projectId);
  const tasks = getProjectTasks(projectId);

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Project not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const progressPercentage = tasks.length > 0 
    ? Math.round((doneTasks.length / tasks.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <p className="text-gray-300 mt-1">{project.description}</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateTaskModal(true)}>
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Progress</h3>
            <span className="text-2xl font-bold text-primary-400">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">
            {doneTasks.length} of {tasks.length} tasks completed
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-900/50 rounded-2xl">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{project.members.length}</p>
              <p className="text-sm text-gray-300">Team Members</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-900/50 rounded-2xl">
              <Calendar className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-300">Created</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'tasks', label: 'Tasks', icon: null },
            { id: 'overview', label: 'Overview', icon: null },
            { id: 'discussions', label: 'Discussions', icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-dark-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                {tab.icon && <tab.icon size={16} />}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* To Do */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">To Do</h3>
                <Badge variant="default">{todoTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {todoTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {}}
                  />
                ))}
                {todoTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">In Progress</h3>
                <Badge variant="info">{inProgressTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {inProgressTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {}}
                  />
                ))}
                {inProgressTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>

            {/* Done */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Done</h3>
                <Badge variant="success">{doneTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {doneTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {}}
                  />
                ))}
                {doneTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
            <div className="space-y-3">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <Avatar user={member} />
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-gray-300">{member.email}</p>
                  </div>
                  {project.owner.id === member.id && (
                    <Badge variant="info" size="sm">Owner</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Created</label>
                <p className="text-white">{new Date(project.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Owner</label>
                <p className="text-white">{project.owner.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Description</label>
                <p className="text-white">{project.description}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'discussions' && (
        <Card className="p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Discussions Coming Soon</h3>
          <p className="text-gray-300">
            Team discussions and threaded conversations will be available in the next version.
          </p>
        </Card>
      )}

      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        projectId={projectId}
        projectMembers={project.members}
      />
    </div>
  );
};

export { ProjectDetailPage };