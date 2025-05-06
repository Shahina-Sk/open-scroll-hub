
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image, X, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface CreatePostProps {
  onPostCreated: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload this to a server
    // For now, we'll just create a local URL
    const url = URL.createObjectURL(file);
    setPostImage(url);
  };

  const removeImage = () => {
    setPostImage(null);
  };

  const handleSubmit = () => {
    if (!postText.trim() && !postImage) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPost = {
        id: `post-${Date.now()}`,
        content: postText,
        image: postImage,
        author: {
          id: user?.id,
          name: user?.name || '',
          profilePicture: user?.profilePicture || '',
          role: user?.role || ''
        },
        createdAt: new Date(),
        likes: 0,
        comments: [],
      };
      
      onPostCreated(newPost);
      setPostText('');
      setPostImage(null);
      setIsLoading(false);
      
      toast({
        title: "Post created",
        description: "Your post has been published",
      });
    }, 1000);
  };

  return (
    <Card className="mb-6 border-gray-200">
      <CardContent className="pt-6">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              className="w-full min-h-24 p-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            
            {postImage && (
              <div className="mt-3 relative">
                <img 
                  src={postImage} 
                  alt="Post preview" 
                  className="w-full h-64 object-cover rounded-md" 
                />
                <Button 
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <div>
          <Button variant="ghost" size="sm" className="text-gray-600" asChild>
            <label className="flex items-center cursor-pointer">
              <Image className="h-5 w-5 mr-2" />
              <span>Image</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>
          </Button>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={(!postText.trim() && !postImage) || isLoading}
          className="flex items-center"
        >
          <Send className="h-4 w-4 mr-2" />
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
