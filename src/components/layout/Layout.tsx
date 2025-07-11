import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  userRole?: string;
  userName?: string;
}

export function Layout({ children, userRole = "Admin", userName = "John Doe" }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Header 
        onMenuClick={() => setSidebarOpen(true)}
        userRole={userRole}
        userName={userName}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={userRole}
        />
        
        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}