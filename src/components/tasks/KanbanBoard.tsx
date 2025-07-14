import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { mockTasks, getUserById, getProjectById } from '@/data/mockData';
import { Task } from '@/data/mockData';

const columns = [
  { id: 'todo', title: 'To Do', color: 'text-muted-foreground' },
  { id: 'in-progress', title: 'In Progress', color: 'text-blue-500' },
  { id: 'review', title: 'Review', color: 'text-warning' },
  { id: 'completed', title: 'Completed', color: 'text-success' }
];

const priorityColors = {
  high: 'bg-destructive',
  medium: 'bg-warning',
  low: 'bg-muted'
};

export function KanbanBoard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    
    if (draggedTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggedTask.id 
            ? { ...task, status: newStatus as Task['status'] }
            : task
        )
      );
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Board</h2>
          <p className="text-muted-foreground">
            Drag and drop tasks to update their status
          </p>
        </div>
        <Button variant="gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${column.color}`}>
                {column.title}
              </h3>
              <Badge variant="secondary" className="bg-muted">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>

            <div className="space-y-3 min-h-[500px]">
              {getTasksByStatus(column.id).map((task) => {
                const assignee = getUserById(task.assignee);
                const project = getProjectById(task.project);
                
                return (
                  <Card
                    key={task.id}
                    className="cursor-move hover:shadow-lg transition-shadow card-hover"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {task.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`${priorityColors[task.priority]} text-white border-none text-xs`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {task.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{task.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedHours}h estimated</span>
                        </div>

                        {project && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="truncate">{project.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">
                            {assignee?.name}
                          </span>
                        </div>
                        
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={assignee?.avatar} alt={assignee?.name} />
                          <AvatarFallback className="text-xs">
                            {assignee?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}