"use client"
import ImageCarousel from './ImageCarousel';
import LikeCommentShare from './LikeCommentShare';
import Image from 'next/image';
import { useParams } from "next/navigation";
import { useGetSinglePosts } from "@/hooks/post.hooks";
import Loading from "../shared/Loading";

const PostDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSinglePosts(id as string)

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Image Carousel */}
            <div className="lg:w-1/2 w-full">
                <ImageCarousel images={data?.data?.images} />
            </div>

            {/* Right: User info and Post details */}
            <div className="lg:w-1/2 w-full bg-white px-3 py-3 rounded">
                <div className="flex items-center gap-2 mb-4">
                    <Image height={40} width={40} className="h-10 w-10" src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="User Avatar" />
                    <div>
                        <p className="font-bold">{data?.data?.userId?.name}</p>
                        <p className="text-sm text-gray-500">{new Date(data?.data?.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                <LikeCommentShare postId={data?.data?._id} content={data?.data?.content} />
            </div>
        </div>
    );
};

export default PostDetails;
