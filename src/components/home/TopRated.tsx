"use client";
import React from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { TMostLikePost } from "@/types";
import Image from "next/image";
import ShowContent from "../ClientComponent/ShowContent";
import { useUser } from "@/provider/user.provider";
import Link from "next/link";

const MostLikedSection = ({ post }: { post: TMostLikePost }) => {
    const imageSrc = post?.images?.[0]; // Safely check if the image exists
    const { user } = useUser()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
            {imageSrc ? (
                <Image width={490} height={190} src={imageSrc} alt="Post" className="w-full h-48 object-cover" />
            ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                </div>
            )}
            <div className="p-4">
                <div>
                    <div
                        className="text-gray-600 inline-block dark:text-gray-300]"
                    >
                        {
                            post?.content && <div className="h-12 overflow-hidden">
                                <ShowContent content={post?.content} />
                            </div>
                        }
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <Image
                        src={post?.userId?.profile || '/default-avatar.png'} // Fallback to a default avatar if profile is missing
                        alt={post?.userId?.name}
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium">{post?.userId?.name}</p>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <ThumbsUp className="w-5 h-5" />
                            <span>{post.likeCount} Likes</span>
                        </div>
                    </div>
                </div>
                {/* CTA Button */}
                <div className="mt-4">
                    <Link href={user?.email ? `news-feed/${post?._id}` : "signin"}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold w-full text-center"
                        >
                            Read More
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default MostLikedSection;
