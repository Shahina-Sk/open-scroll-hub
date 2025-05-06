
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Post, { PostType } from '@/components/Post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Calendar, Mail, Link } from 'lucide-react';

// Sample user posts
const userPosts: PostType[] = [
  {
    id: 'user-post-1',
    content: "Just attended an amazing conference on UI/UX design trends for 2025! Key takeaways: more focus on accessibility, continued evolution of dark mode, and increasing importance of micro-interactions. Excited to apply these insights to our product redesign.",
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    author: {
      id: '1',
      name: 'John Doe',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      role: 'Product Manager'
    },
    createdAt: new Date(new Date().setHours(new Date().getHours() - 8)),
    likes: 37,
    comments: [
      {
        id: 'comment-user-1',
        content: 'Great insights! Would love to hear more about the micro-interactions.',
        author: {
          id: '2',
          name: 'Sarah Smith',
          profilePicture: 'https://i.pravatar.cc/150?img=5'
        },
        createdAt: new Date(new Date().setHours(new Date().getHours() - 7))
      }
    ]
  },
  {
    id: 'user-post-2',
    content: "Reflecting on our Q1 product launch. Proud of the team for shipping on time despite the challenges. User feedback has been overwhelmingly positive so far!",
    author: {
      id: '1',
      name: 'John Doe',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      role: 'Product Manager'
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    likes: 24,
    comments: []
  }
];

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If user is not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="nexus-container py-6">
        {/* Profile Header */}
        <div className="rounded-xl overflow-hidden bg-white border border-gray-200 mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative"></div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="-mt-16 md:-mt-20">
                <img 
                  src={user.profilePicture} 
                  alt={user.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 md:mb-2 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.role || 'Nexus Member'}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700">{user.bio || 'No bio added yet.'}</p>
              
              <div className="mt-4 flex flex-wrap gap-y-2 text-gray-600">
                {user.role && (
                  <div className="flex items-center mr-6">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span className="text-sm">{user.role}</span>
                  </div>
                )}
                <div className="flex items-center mr-6">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Joined May 2023</span>
                </div>
                <div className="flex items-center mr-6">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Link className="h-4 w-4 mr-1" />
                  <a href="#" className="text-sm text-primary hover:underline">nexus.example.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="posts">
              <TabsList className="mb-6 bg-white border border-gray-200">
                <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
                <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts">
                <div className="space-y-4">
                  {userPosts.map(post => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-gray-500">Recent activity will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="media">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-gray-500">Media uploads will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column */}
          <div className="w-full md:w-1/3">
            <div className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-medium">Connections</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">250 connections</span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      See all
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div key={num} className="aspect-square relative rounded-md overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${num + 20}`} 
                          alt="Connection" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-medium">Skills & Expertise</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {['Product Management', 'UX/UI Design', 'Team Leadership', 'Agile', 'Strategic Planning', 'Data Analysis'].map((skill, i) => (
                      <div 
                        key={i}
                        className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                      >
                        {skill}
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

export default Profile;
