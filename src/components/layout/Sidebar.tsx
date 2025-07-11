import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Gauge, 
  FileText, 
  CreditCard, 
  BarChart3, 
  UserCog, 
  ClipboardList,
  Droplets,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["Admin", "Clerk", "IT Officer", "Customer"]
  },
  {
    title: "Customer Registration",
    href: "/customers",
    icon: Users,
    roles: ["Admin", "Clerk"]
  },
  {
    title: "Meter Reading",
    href: "/meter-reading",
    icon: Gauge,
    roles: ["Admin", "Clerk"]
  },
  {
    title: "Billing Overview",
    href: "/billing",
    icon: FileText,
    roles: ["Admin", "Clerk"]
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
    roles: ["Admin", "Clerk", "Customer"]
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: ["Admin", "IT Officer"]
  },
  {
    title: "User Management",
    href: "/users",
    icon: UserCog,
    roles: ["Admin"]
  },
  {
    title: "Audit Logs",
    href: "/audit",
    icon: ClipboardList,
    roles: ["Admin", "IT Officer"]
  }
];

export function Sidebar({ isOpen, onClose, userRole = "Admin" }: SidebarProps) {
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-gradient-card border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-elegant",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-water rounded-lg flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">THIWASCO</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-elegant" 
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {userRole}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                v2.1.0
              </Badge>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}