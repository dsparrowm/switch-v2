import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

const metrics = [
  { title: 'Total Projects', value: '24', change: '+12%', trend: 'up', icon: BarChart3 },
  { title: 'Active Users', value: '156', change: '+8%', trend: 'up', icon: Users },
  { title: 'Hours Tracked', value: '1,247', change: '+15%', trend: 'up', icon: Clock },
  { title: 'Completed Tasks', value: '342', change: '+23%', trend: 'up', icon: CheckCircle },
];

const projectPerformance = [
  { project: 'Website Redesign', progress: 85, tasks: 24, completed: 20, onTrack: true },
  { project: 'Mobile App', progress: 67, tasks: 18, completed: 12, onTrack: true },
  { project: 'API Integration', progress: 42, tasks: 15, completed: 6, onTrack: false },
  { project: 'Dashboard Analytics', progress: 78, tasks: 12, completed: 9, onTrack: true },
];

const teamProductivity = [
  { member: 'John Doe', tasksCompleted: 28, hoursWorked: 42, efficiency: 92 },
  { member: 'Jane Smith', tasksCompleted: 24, hoursWorked: 38, efficiency: 89 },
  { member: 'Mike Johnson', tasksCompleted: 31, hoursWorked: 45, efficiency: 87 },
  { member: 'Sarah Wilson', tasksCompleted: 26, hoursWorked: 40, efficiency: 85 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track performance and productivity insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {metric.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Performance
            </CardTitle>
            <CardDescription>Track progress across all active projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectPerformance.map((project) => (
              <div key={project.project} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{project.project}</span>
                    <Badge variant={project.onTrack ? 'default' : 'destructive'}>
                      {project.onTrack ? 'On Track' : 'Behind'}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {project.completed}/{project.tasks} tasks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Productivity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Team Productivity
            </CardTitle>
            <CardDescription>Individual performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamProductivity.map((member) => (
                <div key={member.member} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{member.member}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{member.tasksCompleted} tasks</span>
                      <span>{member.hoursWorked}h worked</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{member.efficiency}%</span>
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
            <CardDescription>Daily task completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Distribution</CardTitle>
            <CardDescription>How time is spent across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Pie chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Actionable insights based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Productivity Up</span>
              </div>
              <p className="text-sm text-green-600">
                Team productivity increased by 15% this month compared to last month.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-700 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Attention Needed</span>
              </div>
              <p className="text-sm text-yellow-600">
                API Integration project is behind schedule. Consider resource reallocation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Goal Achievement</span>
              </div>
              <p className="text-sm text-blue-600">
                85% of monthly goals achieved. Great work on meeting targets!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}