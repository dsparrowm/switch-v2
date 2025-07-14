import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Video,
  Phone
} from 'lucide-react';

const events = [
  { id: 1, title: 'Team Standup', time: '09:00 AM', duration: '30 min', type: 'meeting', attendees: 8, color: 'bg-blue-500' },
  { id: 2, title: 'Project Review', time: '02:00 PM', duration: '1 hour', type: 'meeting', attendees: 5, color: 'bg-green-500' },
  { id: 3, title: 'Client Call', time: '04:00 PM', duration: '45 min', type: 'call', attendees: 3, color: 'bg-purple-500' },
  { id: 4, title: 'Design Workshop', time: '10:00 AM', duration: '2 hours', type: 'workshop', attendees: 12, color: 'bg-orange-500' },
  { id: 5, title: 'Sprint Planning', time: '03:00 PM', duration: '1.5 hours', type: 'meeting', attendees: 8, color: 'bg-red-500' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const generateCalendarDays = () => {
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === 'next' ? 1 : -1), 1));
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'workshop': return <Video className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and meetings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Today</Button>
          <Button className="self-start sm:self-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {months[currentMonth]} {currentYear}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={view === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('month')}
                  >
                    Month
                  </Button>
                  <Button
                    variant={view === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('week')}
                  >
                    Week
                  </Button>
                  <Button
                    variant={view === 'day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('day')}
                  >
                    Day
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === 'month' && (
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[80px] p-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                        isToday(day) ? 'bg-primary/10 border-primary' : ''
                      } ${
                        !isCurrentMonth(day) ? 'text-muted-foreground bg-muted/20' : ''
                      }`}
                    >
                      <div className={`text-sm ${isToday(day) ? 'font-bold' : ''}`}>
                        {day.getDate()}
                      </div>
                      {/* Sample events for demo */}
                      {day.getDate() === today.getDate() && isCurrentMonth(day) && (
                        <div className="mt-1 space-y-1">
                          <div className="w-full h-4 bg-blue-500 rounded text-xs text-white px-1 flex items-center">
                            Standup
                          </div>
                          <div className="w-full h-4 bg-green-500 rounded text-xs text-white px-1 flex items-center">
                            Review
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {view === 'week' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Week view coming soon...</p>
                </div>
              )}
              {view === 'day' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Day view coming soon...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Today's Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.time}
                      <span>•</span>
                      <span>{event.duration}</span>
                    </div>
                  </div>
                  {getEventTypeIcon(event.type)}
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.slice(3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Tomorrow, {event.time}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.attendees}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" />
                Start Instant Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Book Meeting Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}