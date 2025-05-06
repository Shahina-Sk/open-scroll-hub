
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  id: string;
  email: string;
  name: string;
  profilePicture: string;
  bio: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    bio: 'Senior Product Manager with 8+ years of experience in tech.',
    role: 'Product Manager'
  },
  {
    id: '2',
    email: 'sarah.smith@example.com',
    name: 'Sarah Smith',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    bio: 'UX Designer passionate about creating intuitive user experiences.',
    role: 'UX Designer'
  },
  {
    id: '3',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    bio: 'Software Engineer specializing in frontend development.',
    role: 'Software Engineer'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('nexusUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login functionality
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we're checking against our mock users
      const foundUser = mockUsers.find(user => user.email === email);
      
      if (foundUser && password.length >= 6) {
        // Simulate successful login
        setUser(foundUser);
        localStorage.setItem('nexusUser', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      }
      throw error;
    }
  };

  // Signup functionality
  const signup = async (email: string, name: string, password: string) => {
    try {
      // Check if email is already used
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create a new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email,
        name,
        profilePicture: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        bio: '',
        role: '',
      };

      // In a real app, this would be an API call to create the user
      // For demo, we're just setting the state
      setUser(newUser);
      localStorage.setItem('nexusUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome to Nexus, ${name}!`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
      }
      throw error;
    }
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexusUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
