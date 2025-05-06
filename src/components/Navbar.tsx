
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell, Search, User, Home, LogOut, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [notifications, setNotifications] = useState(3); // Demo notifications count

  if (!isAuthenticated) {
    return (
      <header className="border-b bg-white">
        <div className="nexus-container py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-nexus-800">Nexus</Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="nexus-container py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-2xl font-bold text-nexus-800 mr-8">Nexus</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-primary">
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-primary">
              <User className="w-5 h-5 mr-2" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.profilePicture} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
