import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex-1" />
            </header>
            <main className="flex-1 p-6 bg-background">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}