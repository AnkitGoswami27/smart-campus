import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
  studentId?: string;
  facultyId?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'student' | 'faculty' | 'admin') => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any existing user data on app start to always show login
    localStorage.removeItem('currentUser');
    setUser(null);
  }, []);

  const login = (role: 'student' | 'faculty' | 'admin') => {
    const userData = {
      id: `${role}-${Date.now()}`,
      name: role === 'admin' ? 'Admin User' : role === 'faculty' ? 'Dr. Sarah Johnson' : 'John Doe',
      email: `${role}@campus.edu`,
      role: role,
      avatar: '',
      studentId: role === 'student' ? 'ST2024001' : undefined,
      facultyId: role === 'faculty' ? 'FAC001' : undefined,
      department: role === 'admin' ? 'Administration' : 'Computer Science'
    };

    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    // Force navigation to login
    window.location.href = '/login';
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};