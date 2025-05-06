
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, MapPin, Briefcase, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProfileCardProps {
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isCurrentUser = false }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="border-gray-200">
      <CardHeader className="relative p-0">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg"></div>
        <div className="absolute -bottom-12 left-0 w-full flex justify-center">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      
      <CardContent className="pt-16 pb-4 text-center">
        <h3 className="text-2xl font-bold">{user.name}</h3>
        <p className="text-gray-600">{user.role || 'Nexus Member'}</p>
        
        <div className="mt-4 text-gray-600">
          {user.bio || 'No bio added yet.'}
        </div>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          {user.role && (
            <div className="flex items-center justify-center">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{user.role}</span>
            </div>
          )}
          <div className="flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Joined May 2023</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center pt-0 pb-4">
        {isCurrentUser ? (
          <Button variant="outline" className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <Button className="w-full">
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
