import { mockUsers } from '@/contexts/AuthContext';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  budget: number;
  priority: 'low' | 'medium' | 'high';
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  project: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  dependencies: string[];
  attachments: string[];
}

export interface TimeEntry {
  id: string;
  userId: string;
  taskId: string;
  projectId: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  type: 'standup' | 'meeting' | 'review' | 'planning';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete overhaul of the mobile application user interface and experience',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    team: ['1', '2', '3'],
    budget: 50000,
    priority: 'high',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Customer Portal',
    description: 'Self-service portal for customers to manage their accounts and support tickets',
    status: 'planning',
    progress: 25,
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    team: ['1', '2'],
    budget: 75000,
    priority: 'medium',
    color: '#10B981'
  },
  {
    id: '3',
    name: 'API Migration',
    description: 'Migrate legacy API endpoints to new GraphQL infrastructure',
    status: 'active',
    progress: 60,
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    team: ['2'],
    budget: 35000,
    priority: 'high',
    color: '#8B5CF6'
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard for business intelligence',
    status: 'completed',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2023-12-15',
    team: ['1', '3'],
    budget: 40000,
    priority: 'medium',
    color: '#06B6D4'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new user onboarding flow',
    description: 'Create wireframes and mockups for the improved user onboarding experience',
    status: 'in-progress',
    priority: 'high',
    assignee: '3',
    project: '1',
    dueDate: '2024-02-15',
    estimatedHours: 16,
    actualHours: 12,
    tags: ['UI/UX', 'Design', 'User Research'],
    dependencies: [],
    attachments: ['onboarding-wireframes.fig', 'user-research.pdf']
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up secure authentication with JWT tokens and role-based access control',
    status: 'completed',
    priority: 'high',
    assignee: '2',
    project: '2',
    dueDate: '2024-01-30',
    estimatedHours: 24,
    actualHours: 28,
    tags: ['Backend', 'Security', 'Authentication'],
    dependencies: [],
    attachments: ['auth-spec.md']
  },
  {
    id: '3',
    title: 'Setup GraphQL schema',
    description: 'Define GraphQL schema for user management and data operations',
    status: 'in-progress',
    priority: 'medium',
    assignee: '2',
    project: '3',
    dueDate: '2024-02-20',
    estimatedHours: 20,
    actualHours: 8,
    tags: ['Backend', 'GraphQL', 'API'],
    dependencies: ['2'],
    attachments: ['schema.graphql']
  },
  {
    id: '4',
    title: 'Create project dashboard mockups',
    description: 'Design mockups for the main project dashboard with metrics and KPIs',
    status: 'review',
    priority: 'medium',
    assignee: '3',
    project: '1',
    dueDate: '2024-02-10',
    estimatedHours: 12,
    actualHours: 10,
    tags: ['UI/UX', 'Design', 'Dashboard'],
    dependencies: ['1'],
    attachments: ['dashboard-mockups.fig']
  },
  {
    id: '5',
    title: 'Write API documentation',
    description: 'Comprehensive documentation for all API endpoints and usage examples',
    status: 'todo',
    priority: 'low',
    assignee: '2',
    project: '3',
    dueDate: '2024-03-01',
    estimatedHours: 16,
    actualHours: 0,
    tags: ['Documentation', 'API'],
    dependencies: ['3'],
    attachments: []
  }
];

export const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    userId: '2',
    taskId: '2',
    projectId: '2',
    date: '2024-01-29',
    hours: 8,
    description: 'Implemented JWT authentication and middleware',
    billable: true
  },
  {
    id: '2',
    userId: '3',
    taskId: '1',
    projectId: '1',
    date: '2024-01-29',
    hours: 6,
    description: 'Created user persona research and initial wireframes',
    billable: true
  },
  {
    id: '3',
    userId: '2',
    taskId: '3',
    projectId: '3',
    date: '2024-01-30',
    hours: 4,
    description: 'Designed GraphQL schema structure',
    billable: true
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Daily Standup',
    description: 'Team sync on progress and blockers',
    date: '2024-01-30',
    startTime: '09:00',
    endTime: '09:30',
    attendees: ['1', '2', '3'],
    type: 'standup',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Sprint Planning',
    description: 'Plan upcoming sprint goals and tasks',
    date: '2024-02-01',
    startTime: '10:00',
    endTime: '12:00',
    attendees: ['1', '2', '3'],
    type: 'planning',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Design Review',
    description: 'Review mobile app redesign mockups',
    date: '2024-01-28',
    startTime: '14:00',
    endTime: '15:30',
    attendees: ['1', '3'],
    type: 'review',
    status: 'completed'
  }
];

export const mockActivities = [
  {
    id: '1',
    type: 'task_completed',
    user: '2',
    message: 'completed task "Implement authentication system"',
    timestamp: '2024-01-30T14:30:00Z',
    project: '2'
  },
  {
    id: '2',
    type: 'project_updated',
    user: '1',
    message: 'updated project "Mobile App Redesign" progress to 75%',
    timestamp: '2024-01-30T13:15:00Z',
    project: '1'
  },
  {
    id: '3',
    type: 'meeting_scheduled',
    user: '1',
    message: 'scheduled "Sprint Planning" meeting for Feb 1st',
    timestamp: '2024-01-30T10:45:00Z',
    project: null
  },
  {
    id: '4',
    type: 'task_assigned',
    user: '3',
    message: 'was assigned task "Create project dashboard mockups"',
    timestamp: '2024-01-29T16:20:00Z',
    project: '1'
  }
];

export const getUserById = (id: string) => mockUsers.find(user => user.id === id);
export const getProjectById = (id: string) => mockProjects.find(project => project.id === id);
export const getTaskById = (id: string) => mockTasks.find(task => task.id === id);

export const getTasksByProject = (projectId: string) => 
  mockTasks.filter(task => task.project === projectId);

export const getTasksByUser = (userId: string) => 
  mockTasks.filter(task => task.assignee === userId);

export const getProjectsByUser = (userId: string) => 
  mockProjects.filter(project => project.team.includes(userId));

export const getTimeEntriesByUser = (userId: string) => 
  mockTimeEntries.filter(entry => entry.userId === userId);

export const getUpcomingMeetings = () => 
  mockMeetings.filter(meeting => meeting.status === 'scheduled' && new Date(meeting.date) >= new Date());

export const getRecentActivities = (limit = 10) => 
  mockActivities.slice(0, limit);

export { mockUsers };