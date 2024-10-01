import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you're using ShadCN Skeleton

const LeftSideProfileSkeleton = () => {
    return (
        <div className="hidden lg:block w-1/4 p-6 bg-white">
            <div className="relative mb-4">
                {/* Skeleton for Cover Image */}
                <Skeleton className="w-full h-32 rounded-md" />

                {/* Skeleton for Profile Image */}
                <div className="absolute -bottom-10 left-4">
                    <Skeleton className="w-20 h-20 border-4 border-white rounded-md" />
                </div>
            </div>

            <div className="mt-12 text-center">
                {/* Skeleton for Username */}
                <Skeleton className="w-3/4 h-6 mx-auto rounded-md" />

                {/* Skeleton for Bio */}
                <Skeleton className="w-1/2 h-4 mt-2 mx-auto rounded-md" />

                <div className="flex justify-between mt-4 text-gray-800">
                    {/* Skeleton for Posts, Followers, and Following */}
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-10 h-6 rounded-md" />
                        <Skeleton className="w-10 h-4 mt-2 rounded-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-10 h-6 rounded-md" />
                        <Skeleton className="w-10 h-4 mt-2 rounded-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-10 h-6 rounded-md" />
                        <Skeleton className="w-10 h-4 mt-2 rounded-md" />
                    </div>
                </div>
            </div>

            {/* Skeleton for Button */}
            <Skeleton className="mt-6 w-full h-10 rounded-md" />
        </div>
    );
};

export default LeftSideProfileSkeleton;
