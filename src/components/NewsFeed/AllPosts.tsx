"use client"

import { useAllPosts } from "@/hooks/post.hooks"
import { IPost } from "@/types"
import PostCard from "../Post/PostCard"

const AllPosts = () => {
    const { data } = useAllPosts()
    console.log(data)
    return (
        <div>
            {
                data?.data?.map((post: IPost) => <PostCard key={post?._id} post={post} />)
            }
        </div>
    )
}

export default AllPosts
