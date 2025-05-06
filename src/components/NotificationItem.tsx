
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export type NotificationType = {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'follow';
  content: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: Date;
  read: boolean;
};

interface NotificationItemProps {
  notification: NotificationType;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead 
}) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">❤️</div>;
      case 'comment':
        return <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">💬</div>;
      case 'mention':
        return <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">@</div>;
      case 'follow':
        return <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">➕</div>;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`p-4 flex items-start space-x-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <Avatar>
        <AvatarImage src={notification.user.profilePicture} alt={notification.user.name} />
        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{notification.user.name}</span> {notification.content}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {format(notification.createdAt, 'MMM d, h:mm a')}
        </p>
      </div>
      
      {getNotificationIcon()}
    </div>
  );
};

export default NotificationItem;
