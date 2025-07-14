import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar onMenuToggle={handleMenuToggle} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </aside>

        {/* Mobile sidebar overlay */}
        {!sidebarCollapsed && (
          <div 
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={handleMenuToggle}
          >
            <aside className="w-64 h-full bg-card">
              <Sidebar />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}