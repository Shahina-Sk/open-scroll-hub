
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MessageCircle, Heart, Share, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Comment from '@/components/Comment';
import { useToast } from '@/components/ui/use-toast';

export type PostType = {
  id: string;
  content: string;
  image?: string;
  author: {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
  };
  createdAt: Date;
  likes: number;
  comments: CommentType[];
  liked?: boolean;
};

export type CommentType = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: Date;
};

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentType[]>(post.comments);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      toast({
        title: "Post liked",
        description: "You liked this post",
      });
    }
  };

  const handleComment = () => {
    if (commentText.trim() === '') return;
    
    const newComment: CommentType = {
      id: `comment-${comments.length + 1}`,
      content: commentText,
      author: {
        id: 'current-user',
        name: 'You',
        profilePicture: 'https://i.pravatar.cc/150?img=20'
      },
      createdAt: new Date()
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
    
    if (!showComments) {
      setShowComments(true);
    }
    
    toast({
      title: "Comment added",
      description: "Your comment has been added",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing functionality would be implemented here",
    });
  };

  return (
    <Card className="mb-4 border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.author.id}`}>
              <Avatar>
                <AvatarImage src={post.author.profilePicture} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="font-medium">
                <Link to={`/profile/${post.author.id}`} className="hover:underline">
                  {post.author.name}
                </Link>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">{post.author.role}</p>
                <span className="mx-1 text-xs text-gray-500">•</span>
                <p className="text-xs text-gray-500">
                  {format(post.createdAt, 'MMM d')}
                </p>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Hide</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
        {post.image && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col pt-0">
        <div className="flex items-center justify-between w-full py-2 border-t border-b">
          <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleLike}>
            <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{comments.length}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleShare}>
            <Share className="h-5 w-5 mr-1" />
            <span>Share</span>
          </Button>
        </div>
        
        {showComments && (
          <div className="w-full mt-2">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
            
            <div className="mt-3 flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=20" alt="Your avatar" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                />
                <Button size="sm" onClick={handleComment}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
