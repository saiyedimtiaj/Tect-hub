import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';
import { BiSolidLike } from 'react-icons/bi';
import { FaComment, FaRegPaperPlane, FaShare } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useUser } from '@/provider/user.provider';
import { useCreateComment } from '@/hooks/comment.hook';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { envConfig } from '@/config/envConfig';
import { TComment, TUserVote } from '@/types';
import { useAddOrRemoveVote } from '@/hooks/vote.hook';
import { motion } from 'framer-motion';

const LikeComment = ({ postId }: { postId: string }) => {
    const { user } = useUser();

    const { data: commentData, refetch: commentRefetch } = useQuery<any, Error, any, string[]>({
        queryKey: ["COMMENT", postId],
        queryFn: async () => await axios.get(`${envConfig.baseApi}/comment/get-coment/${postId}`),
    });
    const { data: voteData, refetch: voteRefetch } = useQuery<any, Error, any, string[]>({
        queryKey: ["VOTE", postId],
        queryFn: async () => await axios.get(`${envConfig.baseApi}/vote/all-votes/${postId}`),
    });

    const { mutate: createComent, isPending: isComentLoading } = useCreateComment(commentRefetch);
    const { mutate: voteCOrR, isPending } = useAddOrRemoveVote(voteRefetch);

    const handleComment = (e: any) => {
        e.preventDefault();
        const message = e.target.comment.value;
        const commentData = { message, postId };
        createComent(commentData);
        e.target.reset();
    };

    const handleVote = () => {
        voteCOrR({ postId });
    };

    const isVoted = voteData?.data?.data?.votes.some((vote: TUserVote) => vote.userId === user?._id);

    return (
        <div>
            <div className='flex items-center justify-between gap-3 mt-4 mb-3'>
                <div className='flex items-center gap-2.5'>
                    <div className='flex items-center gap-1'>
                        {/* Motion wrapper for animated button */}
                        <motion.button
                            onClick={handleVote}
                            disabled={isPending}
                            whileTap={{ scale: 1.2 }} // Tap animation
                            whileHover={{ scale: 1.1 }} // Hover animation
                            className={`text-${isVoted ? 'purple-600' : 'gray-500'}`} // Change color when voted
                        >
                            <BiSolidLike size={20} />
                        </motion.button>
                        <span className={`text-${isVoted ? 'purple-600' : 'gray-500'}`}>Liked ({voteData?.data?.data?.votes?.length})</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button><FaComment className='text-purple-600' size={20} /></button>
                        <span className='text-purple-600'>Comment ({commentData?.data?.data?.length})</span>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <button><FaShare className='text-gray-500' size={20} /></button>
                    <span className='text-gray-500'>Share</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Image src={user?.profile!} width={40} height={40} alt='User Avatar' className='rounded-full object-cover' />
                <form onSubmit={handleComment} className='relative w-full'>
                    <Input name='comment' placeholder='Add a Comment...' className='w-full bg-[#EEF0F2] py-3' />
                    <button disabled={isComentLoading} type='submit' className='absolute right-3 top-2.5'>
                        <FaRegPaperPlane />
                    </button>
                </form>
            </div>
            <div className='mt-5'>
                {commentData?.data?.data?.slice(0, 2).map((coment: TComment) => (
                    <div key={coment?._id} className='flex gap-2 items-start my-2'>
                        <Image src={coment?.userId?.profile!} width={40} height={40} alt='User Avatar' className='rounded-full object-cover w-10 h-10' />
                        <div className='bg-[#EEF0F2] p-3 rounded-md w-full'>
                            <h1 className="text-lg font-semibold">{coment?.userId?.name}</h1>
                            <p className='text-sm'>{coment?.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-6 mb-3'>
                <p className='font-medium flex items-center gap-3 text-gray-500'>
                    <HiOutlineDotsHorizontal size={22} /> Show more comments
                </p>
            </div>
        </div>
    );
};

export default LikeComment;
