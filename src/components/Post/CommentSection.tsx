import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';

interface CommentSectionProps {
    postId: string;
}

interface Comment {
    id: number;
    user: { name: string; avatar: string };
    content: string;
}

const CommentSection: React.FC<CommentSectionProps> = () => {
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, user: { name: 'Jane Doe', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }, content: 'Nice post!' },
        { id: 2, user: { name: 'John Smith', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }, content: 'Great pictures!' },
    ]);

    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                { id: Date.now(), user: { name: 'You', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }, content: newComment },
            ]);
            setNewComment('');
        }
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Comments Container with Scroll */}
            <div className="overflow-y-scroll scrollbar h-[200px] space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2">
                        <Image width={32} height={32} className="h-8 w-8" src={comment.user.avatar} alt="User Avatar" />
                        <div>
                            <p className="font-semibold">{comment.user.name}</p>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Comment Input */}
            <div className="flex gap-2">
                <Input
                    className="flex-1 bg-gray-200"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleAddComment}>Comment</Button>
            </div>
        </div>
    );
};

export default CommentSection;
