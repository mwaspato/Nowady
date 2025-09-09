import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'property_manager' | 'front_desk' | 'ota';
  properties?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Determine user role based on email domain or specific emails
    let userRole: User['role'] = 'property_manager';
    let userName = 'Property Manager';
    
    if (email.includes('admin') || email === 'admin@nomady.com') {
      userRole = 'admin';
      userName = 'Platform Admin';
    } else if (email.includes('frontdesk') || email.includes('reception')) {
      userRole = 'front_desk';
      userName = 'Front Desk Staff';
    } else if (email.includes('ota') || email.includes('travel')) {
      userRole = 'ota';
      userName = 'OTA Partner';
    }

    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: userName,
      email: email,
      role: userRole,
      properties: ['1', '2']
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}