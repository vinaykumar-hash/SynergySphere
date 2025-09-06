export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: User[];
  owner: User;
  taskCount: number;
  completedTasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignee: User;
  creator: User;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Discussion {
  id: string;
  projectId: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastActivity: string;
  participants: User[];
}

export interface Message {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  edited?: boolean;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'project_invitation' | 'due_soon' | 'discussion_mention';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  projectId?: string;
  taskId?: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}