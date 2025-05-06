
import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { CommentType } from './Post';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex space-x-2 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.profilePicture} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-3 py-2">
          <div className="font-medium text-sm">
            <Link to={`/profile/${comment.author.id}`}>
              {comment.author.name}
            </Link>
          </div>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1 ml-2">
          {format(comment.createdAt, 'MMM d, h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default Comment;
