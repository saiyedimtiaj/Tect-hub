import { IPost } from '@/types';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import { EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import LikeComment from './LikeComment';
import { usePathname } from 'next/navigation';
import { TfiDownload } from "react-icons/tfi";
import { usePDF } from 'react-to-pdf';
import Link from 'next/link';

type Props = {
    post: IPost;
};

const PostCard = ({ post }: Props) => {
    const pathName = usePathname();
    const images = post?.images || [];
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

    // Convert the stored state to the Draft.js editor state
    const contentState = convertFromRaw(JSON.parse(post?.content));
    const editorState = EditorState.createWithContent(contentState);

    return (
        <div className='bg-white rounded shadow-sm px-4 py-2 border my-4' ref={targetRef}>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={post?.userId?.profile as string}
                            width={60}
                            height={60}
                            alt='profile'
                            className='w-[60px] h-[60px] object-cover rounded-full'
                        />
                        <div>
                            <h5 className="text-lg font-semibold">{post?.userId?.name}</h5>
                            <p>{moment(post?.createdAt).format('MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        {
                            pathName === "/news-feed" && <button onClick={() => toPDF()}><TfiDownload /></button>
                        }
                    </div>
                </div>
                <div className="text-area mt-1">
                    {/* Displaying the content from the draft.js editor */}
                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
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
            <LikeComment postId={post?._id!} />
        </div>
    );
};

export default PostCard;
