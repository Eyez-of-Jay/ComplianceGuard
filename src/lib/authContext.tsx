import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  employeeId: string;
  name: string;
  department: string;
  clearanceLevel: 'Standard' | 'Admin';
  role: 'staff' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string) => boolean;
  loginAsAdmin: (employeeId: string, password: string) => boolean;
  signup: (employeeId: string, name: string, department: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'EMP-4729': {
    password: 'password123',
    user: {
      employeeId: 'EMP-4729',
      name: 'Sarah Johnson',
      department: 'Sales',
      clearanceLevel: 'Standard',
      role: 'staff'
    }
  },
  'EMP-0001': {
    password: 'admin123',
    user: {
      employeeId: 'EMP-0001',
      name: 'Jane Wilson',
      department: 'Compliance',
      clearanceLevel: 'Admin',
      role: 'admin'
    }
  },
  'EMP-0002': {
    password: 'admin123',
    user: {
      employeeId: 'EMP-0002',
      name: 'Robert Martinez',
      department: 'Compliance',
      clearanceLevel: 'Admin',
      role: 'admin'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('complianceGuard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (employeeId: string, password: string): boolean => {
    const userData = MOCK_USERS[employeeId];
    if (userData && userData.password === password && userData.user.role === 'staff') {
      setUser(userData.user);
      localStorage.setItem('complianceGuard_user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const loginAsAdmin = (employeeId: string, password: string): boolean => {
    const userData = MOCK_USERS[employeeId];
    if (userData && userData.password === password && userData.user.role === 'admin') {
      setUser(userData.user);
      localStorage.setItem('complianceGuard_user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const signup = (employeeId: string, name: string, department: string, password: string): boolean => {
    // Check if user already exists
    if (MOCK_USERS[employeeId]) {
      return false;
    }

    // Create new user
    const newUser: User = {
      employeeId,
      name,
      department,
      clearanceLevel: 'Standard',
      role: 'staff'
    };

    MOCK_USERS[employeeId] = {
      password,
      user: newUser
    };

    setUser(newUser);
    localStorage.setItem('complianceGuard_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('complianceGuard_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAsAdmin,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
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
