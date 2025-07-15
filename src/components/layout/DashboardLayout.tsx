import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}