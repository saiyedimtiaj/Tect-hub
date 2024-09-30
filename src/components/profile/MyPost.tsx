"use client"
import { useGetMyPosts } from '@/hooks/post.hooks'
import { IPost } from '@/types';
import React from 'react'
import PostCard from '../Post/PostCard';

const MyPost = () => {
    const { data } = useGetMyPosts();
    console.log(data)
    return (
        <div className='max-w-[1000px] mx-auto'>
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

export default MyPost
