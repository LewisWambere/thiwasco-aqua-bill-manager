import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Clerk" | "IT Officer" | "Customer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@thiwasco.co.ke",
    role: "Admin",
    password: "admin123"
  },
  {
    id: "2", 
    name: "Jane Clerk",
    email: "clerk@thiwasco.co.ke",
    role: "Clerk",
    password: "clerk123"
  },
  {
    id: "3",
    name: "Bob IT",
    email: "it@thiwasco.co.ke", 
    role: "IT Officer",
    password: "it123"
  },
  {
    id: "4",
    name: "Mary Customer",
    email: "customer@example.com",
    role: "Customer",
    password: "customer123"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}