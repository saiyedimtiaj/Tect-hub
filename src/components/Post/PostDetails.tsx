"use client"
import { Separator } from "@/components/ui/separator"
import ImageCarousel from './ImageCarousel';
import CommentSection from './CommentSection';
import LikeCommentShare from './LikeCommentShare';
import Image from 'next/image';

interface User {
    name: string;
    avatar: string;
}

interface Post {
    id: string;
    user: User;
    createdAt: string;
    description: string;
    images: string[];
    likes: number;
    comments: { id: number; user: User; content: string }[];
}

interface PostDetailsProps {
    post: Post;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Image Carousel */}
            <div className="lg:w-1/2 w-full">
                <ImageCarousel images={post.images} />
            </div>

            {/* Right: User info and Post details */}
            <div className="lg:w-1/2 w-full bg-white px-3 py-3 rounded">
                {/* User Info */}
                <div className="flex items-center gap-2 mb-4">
                    <Image height={40} width={40} className="h-10 w-10" src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="User Avatar" />
                    <div>
                        <p className="font-bold">{post.user.name}</p>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Post Description */}
                <p className="mb-6">{post.description}</p>

                <div>
                    <Separator className="mb-2" />
                </div>

                {/* Like, Comment, Share Buttons */}
                <LikeCommentShare post={post} />

                {/* Comment Section */}
                <CommentSection postId={post.id} />
            </div>
        </div>
    );
};

export default PostDetails;
