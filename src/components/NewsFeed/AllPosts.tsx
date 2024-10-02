"use client"

import { useAllPosts } from "@/hooks/post.hooks"
import { IPost } from "@/types"
import PostCard from "../Post/PostCard"
import Image from "next/image"
import { useUser } from "@/provider/user.provider"
import { HiPhotograph } from "react-icons/hi";
import { BiSolidVideoPlus } from "react-icons/bi";
import Slider from "./Slider"
import { useEffect, useRef, useState } from "react";
import PostCardSkeleton from "../Scaleton/PostCardSkeleton"
import AddPost from "../Modal/AddPost"
import SearchBar from "./SearchBar"

const AllPosts = () => {
    const [open, setIsOpen] = useState(false)
    const [limit, setLimit] = useState(3);
    const { data, refetch, isFetching, isLoading, error } = useAllPosts(limit);
    const { user } = useUser();
    const postRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = postRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (index >= data?.data?.length - 1) {
                        setLimit(prevLimit => prevLimit + 3); // Increment limit to load more posts
                        refetch();
                        return
                    } else {
                    }
                }
            });
        }, { threshold: 0.8 }); // Adjust the threshold as needed

        // Observe each post
        postRefs.current.forEach(post => {
            if (post) {
                observer.observe(post);
            }
        });

        // Cleanup function to unobserve posts
        return () => {
            postRefs.current.forEach(post => {
                if (post) {
                    observer.unobserve(post);
                }
            });
        };
    }, [data, refetch]);

    if (isLoading) {
        // Show skeleton loading while fetching data for the first time
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        // Handle any errors that occurred during fetching
        return <div className="text-red-500">Error loading posts: {error.message}</div>;
    }

    return (
        <div>
            <SearchBar />
            <div onClick={() => setIsOpen(true)} className="w-full cursor-pointer bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-center gap-2.5 w-full border border-t-0 border-l-0 border-r-0 pb-3">
                    <Image width={40} height={40} alt="profile" src={user?.profile ? user?.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-full object-cover" />
                    <div className="bg-gray-200 rounded-lg px-3 py-2 w-full">
                        <h1>Whats on your mind?</h1>
                    </div>
                </div>
                <div className="pt-2 flex items-center gap-2">
                    <div className="flex items-center bg-gray-200 py-1 px-2 rounded-lg">
                        <p><HiPhotograph /></p>
                        <p className="text-sm font-medium">Photo</p>
                    </div>
                    <div className="flex items-center bg-gray-200 py-1 px-2 rounded-lg">
                        <p><BiSolidVideoPlus /></p>
                        <p className="text-sm font-medium">Video</p>
                    </div>
                </div>
            </div>
            <div className="lg:hidden block">
                <Slider />
            </div>
            <div>
                {
                    data?.data?.map((post: IPost, index: number) => (
                        <div
                            ref={el => { postRefs.current[index] = el }}
                            key={post?._id}
                        >
                            <PostCard post={post} />
                        </div>
                    ))
                }
            </div>
            {isFetching && <p className="text-xl">Loading more posts...</p>}
            <AddPost onOpenChange={setIsOpen} isOpen={open} />
        </div>
    );
}

export default AllPosts;
