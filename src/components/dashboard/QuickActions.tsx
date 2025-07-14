import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart3 
} from 'lucide-react';

const quickActions = [
  {
    icon: Plus,
    label: 'New Task',
    description: 'Create a new task',
    color: 'text-primary',
    action: () => console.log('New task')
  },
  {
    icon: Calendar,
    label: 'Schedule Meeting',
    description: 'Set up a team meeting',
    color: 'text-success',
    action: () => console.log('Schedule meeting')
  },
  {
    icon: Users,
    label: 'Invite Member',
    description: 'Add team member',
    color: 'text-accent',
    action: () => console.log('Invite member')
  },
  {
    icon: FileText,
    label: 'Create Project',
    description: 'Start new project',
    color: 'text-warning',
    action: () => console.log('Create project')
  },
  {
    icon: MessageSquare,
    label: 'Send Message',
    description: 'Chat with team',
    color: 'text-purple-500',
    action: () => console.log('Send message')
  },
  {
    icon: BarChart3,
    label: 'View Reports',
    description: 'Analytics dashboard',
    color: 'text-blue-500',
    action: () => console.log('View reports')
  }
];

export function QuickActions() {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}