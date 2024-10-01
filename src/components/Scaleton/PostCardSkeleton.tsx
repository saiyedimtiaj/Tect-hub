import React from 'react';

const PostCardSkeleton = () => {
    return (
        <div className='bg-white rounded shadow-sm px-4 py-2 border my-4'>
            <div>
                {/* User Info Skeleton */}
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-1'>
                        <div className='w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse'></div>
                        <div>
                            <div className="w-32 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse mt-1"></div>
                        </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Post Content Skeleton */}
                <div className="text-area mt-3 space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Image Grid Skeleton */}
                <div className='w-full mt-2'>
                    <div className='w-full h-48 bg-gray-200 rounded-lg animate-pulse'></div>
                </div>
            </div>

            {/* Like & Comment Skeleton */}
            <div className="flex justify-between items-center mt-4">
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
};

export default PostCardSkeleton;
