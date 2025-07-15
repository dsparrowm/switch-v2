import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Calendar,
  BarChart3,
  Download,
  Plus,
  Timer,
  Target
} from 'lucide-react';
import { mockProjects, mockTasks } from '@/data/mockData';

const timeEntries = [
  { id: 1, task: 'Dashboard Design', project: 'Website Redesign', duration: '2h 30m', date: '2024-01-15', billable: true },
  { id: 2, task: 'API Integration', project: 'Mobile App', duration: '3h 15m', date: '2024-01-15', billable: true },
  { id: 3, task: 'Code Review', project: 'Website Redesign', duration: '1h 45m', date: '2024-01-14', billable: false },
  { id: 4, task: 'Team Meeting', project: 'General', duration: '1h 00m', date: '2024-01-14', billable: false },
  { id: 5, task: 'Bug Fixes', project: 'Mobile App', duration: '2h 15m', date: '2024-01-13', billable: true },
];

export default function TimeTracking() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setCurrentTime(0);
    // In a real app, save the time entry
    console.log('Time entry saved:', { project: selectedProject, task: selectedTask, time: currentTime });
  };

  const totalHoursToday = timeEntries
    .filter(entry => entry.date === '2024-01-15')
    .reduce((total, entry) => {
      const [hours, minutes] = entry.duration.split('h ');
      return total + parseInt(hours) + parseInt(minutes.replace('m', '')) / 60;
    }, 0);

  const billableHoursToday = timeEntries
    .filter(entry => entry.date === '2024-01-15' && entry.billable)
    .reduce((total, entry) => {
      const [hours, minutes] = entry.duration.split('h ');
      return total + parseInt(hours) + parseInt(minutes.replace('m', '')) / 60;
    }, 0);

  const targetHours = 8;
  const progressPercentage = (totalHoursToday / targetHours) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">Track your time and manage productivity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Manual Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Time Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-primary mb-4">
                  {formatTime(currentTime)}
                </div>
                <div className="flex items-center justify-center gap-4">
                  {!isRunning ? (
                    <Button onClick={handleStart} size="lg" className="px-8">
                      <Play className="mr-2 h-5 w-5" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={handlePause} size="lg" className="px-8" variant="outline">
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={handleStop} size="lg" variant="destructive" className="px-8">
                    <Square className="mr-2 h-5 w-5" />
                    Stop
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project</label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Task</label>
                  <Select value={selectedTask} onValueChange={setSelectedTask}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTasks.slice(0, 5).map(task => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  placeholder="What are you working on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Time Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Time Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{entry.task}</p>
                        <Badge variant={entry.billable ? 'default' : 'secondary'}>
                          {entry.billable ? 'Billable' : 'Non-billable'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.project}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.duration}</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Today's Hours</span>
                  <span className="font-medium">{totalHoursToday.toFixed(1)}h / {targetHours}h</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Billable</p>
                  <p className="font-medium text-lg">{billableHoursToday.toFixed(1)}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Non-billable</p>
                  <p className="font-medium text-lg">{(totalHoursToday - billableHoursToday).toFixed(1)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Hours</p>
                  <p className="font-medium text-lg">32.5h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg/Day</p>
                  <p className="font-medium text-lg">6.5h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Billable</p>
                  <p className="font-medium text-lg">28.0h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-medium text-lg">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Top Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjects.slice(0, 3).map((project, index) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm font-medium">{project.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 20) + 5}h
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}