import { useGetMyPosts } from '@/hooks/post.hooks'
import React from 'react'

const MyPost = () => {
    const { data } = useGetMyPosts();
    console.log(data)
    return (
        <div>

        </div>
    )
}

export default MyPost
