"use client"
import { IPost } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import moment from 'moment';
import LikeComment from './LikeComment';
import { usePathname } from 'next/navigation';
import { TfiDownload } from "react-icons/tfi";
import { usePDF } from 'react-to-pdf';
import Link from 'next/link';
import badge from "../../../public/assets/stamp.png";
import { Trash } from 'lucide-react';
import DeletePostModal from '../Modal/DeletePostModal';
import { useDeletePost } from '@/hooks/post.hooks';
import ShareDialog from '../Modal/ShareDialog';
import ShowContent from '../ClientComponent/ShowContent';

type Props = {
    post: IPost;
    refetch?: any
};

const PostCard = ({ post, refetch }: Props) => {
    const pathName = usePathname();
    const images = post?.images || [];
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deletePost } = useDeletePost();
    const [shareIsOpen, setShareIsOpen] = useState(false)

    const currentDate = new Date();
    const membershipEndDate = new Date(post?.userId?.membershipEnd as Date);
    const isTimeOut = membershipEndDate < currentDate;

    const handleDelete = () => {
        deletePost(post?._id as string, {
            onSuccess: () => {
                refetch()
            }
        });
    };

    const shareUrl = `https://tech-hub-ruddy.vercel.app/news-feed/${post?._id}`;

    return (
        <div className='bg-white rounded shadow-sm px-4 py-2 border my-4' ref={targetRef}>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <Link href={`/profile/${post?.userId?._id}`} className='flex items-center gap-1'>
                        <Image
                            src={post?.userId?.profile as string}
                            width={60}
                            height={60}
                            alt='profile'
                            className='w-[60px] h-[60px] object-cover rounded-full'
                        />
                        <div>
                            <h5 className="text-lg font-semibold flex items-center gap-2">{post?.userId?.name}
                                {
                                    post?.userId?.membershipEnd && !isTimeOut && <Image
                                        width={60}
                                        height={60}
                                        alt="banner"
                                        src={badge}
                                        className="w-[18px] md:w-[25px] h-[18px] md:h-[25px] object-cover "
                                    />
                                }
                            </h5>
                            <p>{moment(post?.createdAt).format('MMMM Do YYYY')}</p>
                        </div>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => toPDF()}><TfiDownload /></button>
                        {
                            pathName === '/profile' && <Trash size={15} onClick={() => setIsOpen(true)} className='cursor-pointer' />
                        }
                    </div>
                </div>
                <div className="text-area mt-1">
                    <ShowContent content={post.content} />
                </div>
                <div className='my-1 flex'>
                    {
                        post?.type === "besic" ? <p className='font-medium text-white bg-red-600 px-4 py-0.5 rounded-full'>Besic</p> : <p className='font-medium text-white bg-blue-500 px-4 py-0.5 rounded-full'>Primum</p>
                    }
                </div>
                <div className='grid grid-cols-2 gap-2 mt-2'>
                    {images.length > 5 ? (
                        <>
                            {images.slice(0, 4).map((img, idx) => (
                                <Link key={idx} className='relative' href={`/news-feed/${post?._id}`} >
                                    <Image
                                        src={img}
                                        width={200}
                                        height={200}
                                        alt='banner'
                                        className='object-cover w-full h-full rounded-lg border border-white'
                                    />
                                </Link>
                            ))}
                            <Link className='relative' href={`/news-feed/${post?._id}`} >
                                <Image
                                    src={images[4]}
                                    width={200}
                                    height={200}
                                    alt='banner'
                                    className='object-cover w-full h-full rounded-lg border border-white blur-md'
                                />
                                <span className='absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50 rounded-lg'>
                                    +{images.length - 4}
                                </span>
                            </Link>
                        </>
                    ) : (
                        images.map((img, idx) => (
                            <Link key={idx} className='relative' href={`/news-feed/${post?._id}`} >
                                <Image
                                    src={img}
                                    width={200}
                                    height={200}
                                    alt='banner'
                                    className='object-cover rounded-lg w-full h-full border border-white'
                                />
                            </Link>
                        ))
                    )}
                </div>
            </div>
            {
                post?._id && <LikeComment postId={post?._id} setShareIsOpen={setShareIsOpen} />
            }

            {/* Share Buttons */}

            <ShareDialog isOpen={shareIsOpen} onClose={() => setShareIsOpen(false)} url={shareUrl} />

            <DeletePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDelete} />
        </div>
    );
};

export default PostCard;
