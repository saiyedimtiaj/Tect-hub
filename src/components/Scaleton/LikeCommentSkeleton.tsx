import React from 'react';

const LikeCommentSkeleton = () => {
    return (
        <div>
            {/* Like and Comment Buttons Skeleton */}
            <div className='flex items-center justify-between gap-3 mt-4 mb-3'>
                <div className='flex items-center gap-2.5'>
                    <div className='flex items-center gap-1'>
                        <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                        <span className='w-20 h-4 bg-gray-200 rounded-md animate-pulse'></span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                        <span className='w-20 h-4 bg-gray-200 rounded-md animate-pulse'></span>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                    <span className='w-12 h-4 bg-gray-200 rounded-md animate-pulse'></span>
                </div>
            </div>

            {/* Comment Input Skeleton */}
            <div className='flex items-center gap-2'>
                <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse'></div>
                <div className='w-full relative'>
                    <div className='w-full h-10 bg-gray-200 rounded-md animate-pulse'></div>
                    <div className='absolute right-3 top-2 w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                </div>
            </div>

            {/* Comments Section Skeleton */}
            <div className='mt-5 space-y-4'>
                {[...Array(2)].map((_, idx) => (
                    <div key={idx} className='flex gap-2 items-start'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse'></div>
                        <div className='w-full bg-gray-200 p-3 rounded-md animate-pulse'>
                            <div className='w-32 h-4 bg-gray-300 rounded-md animate-pulse mb-2'></div>
                            <div className='w-full h-4 bg-gray-300 rounded-md animate-pulse'></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Comments Skeleton */}
            <div className='mt-6 mb-3'>
                <div className='w-40 h-4 bg-gray-200 rounded-md animate-pulse'></div>
            </div>
        </div>
    );
};

export default LikeCommentSkeleton;
