import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

interface LikeCommentShareProps {
    post: {
        likes: number;
        comments: { id: number; user: { name: string }; content: string }[];
    };
}

const LikeCommentShare: React.FC<LikeCommentShareProps> = ({ post }) => {
    return (
        <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" className="flex items-center gap-1">
                <ThumbsUp className="h-5 w-5" /> {post.likes} Likes
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5" /> {post.comments.length} Comments
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
                <Share2 className="h-5 w-5" /> Share
            </Button>
        </div>
    );
};

export default LikeCommentShare;
