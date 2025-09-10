import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, FileText, CreditCard, Settings, LogOut, Building2, User, HelpCircle, Bell, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sidebar as SidebarPrimitive, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader, useSidebar } from '@/components/ui/sidebar';
const mainNavigation = [{
  name: 'Dashboard',
  href: '/dashboard',
  icon: LayoutDashboard
}, {
  name: 'Register Interest',
  href: '/register',
  icon: Plus
}, {
  name: 'My Projects',
  href: '/projects',
  icon: FileText
}, {
  name: 'Payments',
  href: '/payments',
  icon: CreditCard
}];

const supportNavigation = [{
  name: 'Complaints & Warranty',
  href: '/complaints',
  icon: AlertCircle
}];
const bottomNavigation = [{
  name: 'Settings',
  href: '/settings',
  icon: Settings
}, {
  name: 'Help',
  href: '#',
  icon: HelpCircle
}, {
  name: 'Notifications',
  href: '#',
  icon: Bell
}];
export const AppSidebar = () => {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const {
    open
  } = useSidebar();
  const isActive = (path: string) => location.pathname === path;
  return <SidebarPrimitive className="border-r-0" style={{
    background: 'linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(302 84% 61%) 50%, hsl(270 100% 80%) 100%)'
  }}>
      <SidebarHeader className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          {open && <div>
              <h1 className="text-lg font-bold text-white">Express Tiling</h1>
              <p className="text-xs text-white/70">Customer Portal</p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs font-medium uppercase tracking-wider px-3 mb-2">MY ACCOUNT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavigation.map(item => {
              const active = isActive(item.href);
              return <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/80 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}`}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {open && <span>{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-white/60 text-xs font-medium uppercase tracking-wider px-3 mb-2">
            SUPPORT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportNavigation.map(item => {
              const active = isActive(item.href);
              return <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/80 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}`}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {open && <span>{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
              {bottomNavigation.map(item => {
              const active = isActive(item.href);
              return <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/80 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}`}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {open && <span>{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        {open && <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>}
        <Button onClick={logout} variant="ghost" size="sm" className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white">
          <LogOut className="mr-2 h-4 w-4" />
          {open && 'Sign Out'}
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>;
};

// Export as Sidebar for backward compatibility
export { AppSidebar as Sidebar };