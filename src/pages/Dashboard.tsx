
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Post, { PostType } from '@/components/Post';
import CreatePost from '@/components/CreatePost';
import ProfileCard from '@/components/ProfileCard';
import NotificationItem, { NotificationType } from '@/components/NotificationItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

// Sample data for posts
const initialPosts: PostType[] = [
  {
    id: '1',
    content: "Excited to announce that our company has secured $5M in Series A funding! This will allow us to expand our team and accelerate product development. We're looking for talented engineers and designers - check out our careers page for openings.",
    author: {
      id: '2',
      name: 'Sarah Smith',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      role: 'UX Designer'
    },
    createdAt: new Date(new Date().setHours(new Date().getHours() - 2)),
    likes: 42,
    comments: [
      {
        id: 'comment-1',
        content: 'Congratulations! This is amazing news.',
        author: {
          id: '3',
          name: 'Mike Johnson',
          profilePicture: 'https://i.pravatar.cc/150?img=3'
        },
        createdAt: new Date(new Date().setHours(new Date().getHours() - 1))
      }
    ]
  },
  {
    id: '2',
    content: "Just published my article on 'The Future of Remote Work'. Would love to hear your thoughts and experiences working remotely.",
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1000',
    author: {
      id: '3',
      name: 'Mike Johnson',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      role: 'Software Engineer'
    },
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
    likes: 28,
    comments: []
  }
];

// Sample data for notifications
const initialNotifications: NotificationType[] = [
  {
    id: '1',
    type: 'like',
    content: 'liked your post',
    user: {
      id: '2',
      name: 'Sarah Smith',
      profilePicture: 'https://i.pravatar.cc/150?img=5'
    },
    createdAt: new Date(new Date().setHours(new Date().getHours() - 1)),
    read: false
  },
  {
    id: '2',
    type: 'comment',
    content: 'commented on your post',
    user: {
      id: '3',
      name: 'Mike Johnson',
      profilePicture: 'https://i.pravatar.cc/150?img=3'
    },
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    read: false
  },
  {
    id: '3',
    type: 'follow',
    content: 'started following you',
    user: {
      id: '4',
      name: 'Alex Turner',
      profilePicture: 'https://i.pravatar.cc/150?img=7'
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    read: true
  }
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [notifications, setNotifications] = useState<NotificationType[]>(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  // Handler for adding a new post
  const handlePostCreated = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };
  
  // Handler for marking a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Handler for marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="nexus-container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <div className="space-y-6 sticky top-20">
              <ProfileCard isCurrentUser={true} />
              
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-600"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {showNotifications && (
                  <CardContent className="p-0 max-h-96 overflow-y-auto">
                    <div className="py-2 border-b flex justify-between items-center px-4">
                      <span className="text-sm font-medium">Recent Notifications</span>
                      <Button variant="link" size="sm" onClick={handleMarkAllAsRead}>
                        Mark all as read
                      </Button>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map(notification => (
                          <NotificationItem 
                            key={notification.id} 
                            notification={notification} 
                            onMarkAsRead={handleMarkAsRead} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
          
          {/* Main content - Feed */}
          <div className="flex-1">
            <CreatePost onPostCreated={handlePostCreated} />
            
            <div>
              {posts.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          {/* Right sidebar - Suggested connections */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-20 space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Connections</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Alex Turner',
                        role: 'Marketing Manager',
                        avatar: 'https://i.pravatar.cc/150?img=7'
                      },
                      {
                        name: 'Emily Chen',
                        role: 'Product Designer',
                        avatar: 'https://i.pravatar.cc/150?img=10'
                      },
                      {
                        name: 'David Wilson',
                        role: 'Software Engineer',
                        avatar: 'https://i.pravatar.cc/150?img=15'
                      }
                    ].map((person, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={person.avatar} 
                            alt={person.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">{person.name}</p>
                            <p className="text-xs text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {[
                      '#AI',
                      '#RemoteWork',
                      '#ProductManagement',
                      '#FutureOfWork',
                      '#TechInnovation'
                    ].map((topic, i) => (
                      <div key={i} className="text-sm text-primary hover:underline cursor-pointer">
                        {topic}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-white py-6 mt-8">
        <div className="nexus-container text-center text-sm text-gray-500">
          <p>© 2025 Nexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
