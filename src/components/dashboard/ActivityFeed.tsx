import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockActivities, getUserById, getProjectById } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const activityTypeColors = {
  task_completed: 'bg-success',
  project_updated: 'bg-primary',
  meeting_scheduled: 'bg-accent',
  task_assigned: 'bg-warning'
};

const activityTypeLabels = {
  task_completed: 'Task Completed',
  project_updated: 'Project Updated',
  meeting_scheduled: 'Meeting Scheduled',
  task_assigned: 'Task Assigned'
};

export function ActivityFeed() {
  const activities = mockActivities.slice(0, 8);

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const user = getUserById(activity.user);
          const project = activity.project ? getProjectById(activity.project) : null;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <Badge 
                    variant="secondary" 
                    className={`${activityTypeColors[activity.type]} text-white text-xs`}
                  >
                    {activityTypeLabels[activity.type]}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {activity.message}
                </p>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                  {project && (
                    <>
                      <span>•</span>
                      <span>{project.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}