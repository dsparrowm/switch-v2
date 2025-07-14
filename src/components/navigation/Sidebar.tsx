import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Clock, 
  BarChart3,
  Settings
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderOpen
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: CheckSquare
  },
  {
    title: 'Team',
    href: '/team',
    icon: Users
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessageSquare
  },
  {
    title: 'Documents',
    href: '/documents',
    icon: FileText
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar
  },
  {
    title: 'Time Tracking',
    href: '/time-tracking',
    icon: Clock
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export function Sidebar({ className, collapsed = false }: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-card border-r", className)}>
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          {!collapsed && <span>All systems operational</span>}
        </div>
      </div>
    </div>
  );
}