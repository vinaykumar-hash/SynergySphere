import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Task, Discussion, Notification, User } from '../types';

interface AppContextType {
  projects: Project[];
  tasks: Task[];
  discussions: Discussion[];
  notifications: Notification[];
  selectedProject: Project | null;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'taskCount' | 'completedTasks'>) => void;
  selectProject: (project: Project) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  getProjectTasks: (projectId: string) => Task[];
  addProjectMember: (projectId: string, member: User) => void;
  markNotificationRead: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of our mobile application with improved UX',
    createdAt: '2024-01-15T00:00:00Z',
    members: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
      { id: '2', name: 'Michael Chen', email: 'michael@synergysphere.com', initials: 'MC' }
    ],
    owner: { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
    taskCount: 8,
    completedTasks: 3
  },
  {
    id: '2',
    name: 'Marketing Campaign Q1',
    description: 'Launch comprehensive marketing campaign for Q1 2024',
    createdAt: '2024-01-10T00:00:00Z',
    members: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
      { id: '3', name: 'Emily Rodriguez', email: 'emily@synergysphere.com', initials: 'ER' }
    ],
    owner: { id: '3', name: 'Emily Rodriguez', email: 'emily@synergysphere.com', initials: 'ER' },
    taskCount: 12,
    completedTasks: 7
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new login screen',
    description: 'Create modern, accessible login interface with improved security features',
    projectId: '1',
    assignee: { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
    creator: { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Build secure authentication system with JWT tokens',
    projectId: '1',
    assignee: { id: '2', name: 'Michael Chen', email: 'michael@synergysphere.com', initials: 'MC' },
    creator: { id: '1', name: 'Sarah Johnson', email: 'sarah@synergysphere.com', initials: 'SJ' },
    status: 'todo',
    priority: 'high',
    dueDate: '2024-02-05T00:00:00Z',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '3',
    title: 'Content strategy planning',
    description: 'Develop comprehensive content strategy for social media channels',
    projectId: '2',
    assignee: { id: '3', name: 'Emily Rodriguez', email: 'emily@synergysphere.com', initials: 'ER' },
    creator: { id: '3', name: 'Emily Rodriguez', email: 'emily@synergysphere.com', initials: 'ER' },
    status: 'done',
    priority: 'medium',
    dueDate: '2024-01-25T00:00:00Z',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-22T16:45:00Z'
  }
];

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task_assigned',
      title: 'New task assigned',
      message: 'You have been assigned to "Design new login screen"',
      read: false,
      createdAt: '2024-01-20T10:00:00Z',
      projectId: '1',
      taskId: '1'
    }
  ]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'taskCount' | 'completedTasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      taskCount: 0,
      completedTasks: 0
    };
    setProjects(prev => [...prev, newProject]);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    
    // Update project task count
    setProjects(prev => prev.map(p => 
      p.id === taskData.projectId 
        ? { ...p, taskCount: p.taskCount + 1 }
        : p
    ));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    
    // Update project completed tasks count if status changed to done
    if (updates.status === 'done') {
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== 'done') {
        setProjects(prev => prev.map(p => 
          p.id === task.projectId 
            ? { ...p, completedTasks: p.completedTasks + 1 }
            : p
        ));
      }
    }
  };

  const getProjectTasks = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const addProjectMember = (projectId: string, member: User) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, members: [...project.members, member] }
        : project
    ));
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  return (
    <AppContext.Provider value={{
      projects,
      tasks,
      discussions,
      notifications,
      selectedProject,
      createProject,
      selectProject,
      createTask,
      updateTask,
      getProjectTasks,
      addProjectMember,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};