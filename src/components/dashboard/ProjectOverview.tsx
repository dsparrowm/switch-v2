import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockProjects, getUserById } from '@/data/mockData';
import { CalendarDays, Users, Plus } from 'lucide-react';

const statusColors = {
  active: 'bg-success',
  planning: 'bg-warning',
  completed: 'bg-primary',
  'on-hold': 'bg-muted'
};

const statusLabels = {
  active: 'Active',
  planning: 'Planning',
  completed: 'Completed',
  'on-hold': 'On Hold'
};

const priorityColors = {
  high: 'bg-destructive',
  medium: 'bg-warning',
  low: 'bg-muted'
};

export function ProjectOverview() {
  const activeProjects = mockProjects.filter(p => p.status === 'active' || p.status === 'planning');

  return (
    <Card className="card-gradient">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Active Projects</CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge 
                      variant="secondary" 
                      className={`${statusColors[project.status]} text-white`}
                    >
                      {statusLabels[project.status]}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`${priorityColors[project.priority]} text-white border-none`}
                    >
                      {project.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team.length} members</span>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((memberId) => {
                    const member = getUserById(memberId);
                    return (
                      <div
                        key={memberId}
                        className="w-6 h-6 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img 
                          src={member?.avatar} 
                          alt={member?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                  {project.team.length > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}