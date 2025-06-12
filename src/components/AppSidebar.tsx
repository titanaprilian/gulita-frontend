import { Link, useLocation } from "react-router-dom";
import { Home, Search, Inbox, User, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Assuming a more semantic structure
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Diabetes Test", url: "/dashboard/check", icon: Search },
  { title: "Results", url: "/dashboard/result", icon: Inbox },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Sidebar className="w-64 border-r-0 bg-primary text-primary-foreground">
      <SidebarHeader>
        <Link to="/dashboard" className="text-2xl font-bold tracking-tight py-6 px-4">
          Gulita
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarMenu>
          {menuItems.map((item) => {
            // More robust active state detection
            const isActive =
              item.url === "/dashboard" ? location.pathname === item.url : location.pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"} // Use variants for styling
                  className="w-full justify-start text-base"
                  size="lg"
                >
                  <Link to={item.url}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                </Button>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost" // Use a variant for consistent styling
          className="w-full justify-start text-base"
          size="lg"
          onClick={logout} // Use the logout function from the hook
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
