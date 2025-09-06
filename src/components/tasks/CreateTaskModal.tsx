import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { TaskPriority, TaskStatus, User } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectMembers: User[];
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  projectId, 
  projectMembers 
}) => {
  const { createTask } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assigneeId: '',
    priority: 'medium' as TaskPriority,
    status: 'todo' as TaskStatus,
    dueDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const assignee = projectMembers.find(m => m.id === formData.assigneeId) || user;
      
      createTask({
        title: formData.title,
        description: formData.description,
        projectId,
        assignee,
        creator: user,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate
      });
      
      setFormData({
        title: '',
        description: '',
        assigneeId: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
      });
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 rounded-3xl max-w-md w-full p-6 max-h-screen overflow-y-auto border border-dark-700 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-xl hover:bg-dark-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-4 py-3 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-dark-900 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Assignee
            </label>
            <select
              name="assigneeId"
              value={formData.assigneeId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-dark-900 text-white"
              required
            >
              <option value="">Select assignee</option>
              {projectMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-dark-900 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-dark-900 text-white"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1"
            >
              <Plus size={16} className="mr-1" />
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateTaskModal };