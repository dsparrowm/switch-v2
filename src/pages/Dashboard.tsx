import React from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ProjectOverview } from '@/components/dashboard/ProjectOverview';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  mockProjects, 
  mockTasks, 
  mockUsers,
  getTasksByUser,
  getProjectsByUser,
  getUpcomingMeetings
} from '@/data/mockData';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const userTasks = getTasksByUser(user.id);
  const userProjects = getProjectsByUser(user.id);
  const upcomingMeetings = getUpcomingMeetings();
  
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const activeTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const activeProjects = mockProjects.filter(project => project.status === 'active').length;
  const teamMembers = mockUsers.length;

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name}!
          </h2>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Projects"
          value={activeProjects}
          description="Currently in progress"
          icon={FolderOpen}
          change={{ value: 12, type: 'increase' }}
          color="text-primary"
        />
        <MetricCard
          title="Completed Tasks"
          value={completedTasks}
          description="This month"
          icon={CheckSquare}
          change={{ value: 8, type: 'increase' }}
          color="text-success"
        />
        <MetricCard
          title="Team Members"
          value={teamMembers}
          description="Active team size"
          icon={Users}
          change={{ value: 5, type: 'increase' }}
          color="text-accent"
        />
        <MetricCard
          title="Productivity"
          value={`${user.productivity}%`}
          description="Overall performance"
          icon={TrendingUp}
          change={{ value: 2, type: 'increase' }}
          color="text-warning"
        />
      </div>

      {/* Secondary metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Active Tasks"
          value={activeTasks}
          description="Currently working on"
          icon={Clock}
          color="text-blue-500"
        />
        <MetricCard
          title="Upcoming Meetings"
          value={upcomingMeetings.length}
          description="This week"
          icon={Calendar}
          color="text-purple-500"
        />
        <MetricCard
          title="My Projects"
          value={userProjects.length}
          description="Projects you're part of"
          icon={FolderOpen}
          color="text-emerald-500"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Projects overview */}
        <div className="col-span-1 lg:col-span-4">
          <ProjectOverview />
        </div>

        {/* Activity feed */}
        <div className="col-span-1 lg:col-span-3">
          <ActivityFeed />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <QuickActions />
        </div>
        
        {/* Additional widgets can be added here */}
        <div className="col-span-1 lg:col-span-2">
          {/* Placeholder for additional widgets */}
        </div>
      </div>
    </div>
  );
}