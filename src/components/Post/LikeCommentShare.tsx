import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { envConfig } from '@/config/envConfig';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Input } from '../ui/input';
import { TComment, TUserVote } from '@/types';
import Loading from '../shared/Loading';
import { useAddOrRemoveVote } from '@/hooks/vote.hook';
import { useCreateComment } from '@/hooks/comment.hook';
import { useUser } from '@/provider/user.provider';
import { motion } from 'framer-motion'; // Import Framer Motion
import ShowContent from '../ClientComponent/ShowContent';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '../ui/scroll-area';

interface LikeCommentShareProps {
    postId: string;
    content: string;
}

const LikeCommentShare = ({ postId, content }: LikeCommentShareProps) => {
    const { user } = useUser();
    const { data: commentData, refetch: commentRefetch, isLoading } = useQuery<any, Error, any, string[]>({
        queryKey: ["COMMENT", postId],
        queryFn: async () => await axios.get(`${envConfig.baseApi}/comment/get-coment/${postId}`),
    });

    const { data: voteData, refetch: voteRefetch, isLoading: isVoteLoading } = useQuery<any, Error, any, string[]>({
        queryKey: ["VOTE", postId],
        queryFn: async () => await axios.get(`${envConfig.baseApi}/vote/all-votes/${postId}`),
    });

    const { mutate: createComent, isPending: isComentLoading } = useCreateComment(commentRefetch);
    const { mutate: voteCOrR } = useAddOrRemoveVote(voteRefetch);

    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get('comment') as string;
        const commentData = { message, postId };
        createComent(commentData);
        e.currentTarget.reset(); // Reset the form
    };

    const handleVote = () => {
        voteCOrR({ postId });
    };

    if (isLoading || isVoteLoading) {
        return <Loading />;
    }

    const isVoted = voteData?.data?.data?.votes.some((vote: TUserVote) => vote.userId === user?._id);

    return (
        <div className="flex flex-col">
            <ScrollArea className="h-80 pr-2">
                <div>
                    <ShowContent content={content} />
                </div>
                <Separator className='mt-3 mb-1' />
                <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        animate={{ scale: isVoted ? 1.2 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button onClick={handleVote} variant="ghost" className="flex items-center gap-1">
                            <ThumbsUp fill={isVoted ? "#0566FF" : ""} className="h-5 w-5" />
                            {voteData?.data?.data?.votes?.length} Likes
                        </Button>
                    </motion.div>
                    <Button variant="ghost" className="flex items-center gap-1">
                        <MessageCircle className="h-5 w-5" />
                        {commentData?.data?.data?.length} Comments
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-1">
                        <Share2 className="h-5 w-5" />
                        Share
                    </Button>
                </div>
                <div className="flex flex-col h-full space-y-4">
                    <div className="space-y-4">
                        {commentData?.data?.data?.map((comment: TComment) => (
                            <div key={comment._id} className="flex items-start gap-2">
                                <Image width={32} height={32} className="h-8 w-8" src={comment?.userId?.profile} alt="User Avatar" />
                                <div>
                                    <p className="font-semibold">{comment.userId?.name}</p>
                                    <p>{comment?.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
            <form onSubmit={handleComment} className="flex gap-2">
                <Input
                    className="flex-1 bg-gray-200"
                    placeholder="Write a comment..."
                    name='comment'
                />
                <Button disabled={isComentLoading} type='submit'>{isComentLoading ? "Loading" : "Comment"}</Button>
            </form>
        </div>
    );
};

export default LikeCommentShare;
