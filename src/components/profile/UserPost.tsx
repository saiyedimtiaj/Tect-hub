import { IPost } from '@/types'
import React from 'react'
import PostCard from '../Post/PostCard'
import { useGetUserAllPosts } from '@/hooks/post.hooks';
import PostCardSkeleton from '../Scaleton/PostCardSkeleton';

const UserPost = ({ id }: { id: string }) => {
    const { data, isLoading } = useGetUserAllPosts(id);

    if (isLoading) {
        return <PostCardSkeleton />
    }

    return (
        <div className='max-w-[1000px] mx-auto mt-8'>
            {
                data?.data?.length > 0 ? <div>
                    {
                        data?.data?.map((post: IPost) => <PostCard key={post?._id} post={post} />)
                    }
                </div> : <h1 className="text-3xl font-bold text-center">No Post Found</h1>
            }
        </div>
    )
}

export default UserPost
