import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Diabetes Test",
    url: "/dashboard/check",
    icon: Search,
  },
  {
    title: "Results",
    url: "/dashboard/result",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      navigate("/login");
      return;
    }
    try {
      await fetch("http://localhost:3000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // ignore error, always clear tokens
    } finally {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <Sidebar className="bg-gradient-to-b from-blue-600 to-blue-800 text-white min-h-screen w-64 shadow-xl border-r-0 flex flex-col justify-between">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold tracking-tight py-6 px-4 text-white">
            Gulita Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={clsx(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive ? "bg-blue-700/70" : "hover:bg-blue-700/70"
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-3 text-white text-base font-medium">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors duration-200 shadow"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </Sidebar>
  );
}
