"use client";
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useGetUser } from '@/hooks/auth.hook';
import banner from "../../../public/assets/cover.jpg";
import Link from 'next/link';
import LeftSideProfileSkeleton from '../Scaleton/LeftSideProfileSkeleton';

const LeftSideProfile = () => {
    const { data, isLoading } = useGetUser();

    if (isLoading) {
        return <LeftSideProfileSkeleton />;
    }

    return (
        <div className="hidden lg:block w-1/4 p-6 bg-white">
            <div className="relative mb-4">
                <Image
                    src={banner}
                    alt="Cover Photo"
                    width={400}
                    height={100}
                    className="w-full h-32 object-cover rounded-md"
                />
                {/* Profile Image */}
                <div className="absolute -bottom-10 left-4">
                    <Image
                        src={data?.data?.profile}
                        alt="Cover Photo"
                        width={400}
                        height={100}
                        className="w-20 h-20 border-4 border-white object-cover rounded-md"
                    />
                </div>
            </div>
            <div className="mt-12 text-center">
                <h2 className="text-xl font-bold">{data?.data?.name}</h2>
                <p className="text-sm text-gray-600">{data?.data?.bio}</p>
                <div className="flex justify-between mt-4 text-gray-800">
                    <div>
                        <p className="font-bold">100</p>
                        <p>Posts</p>
                    </div>
                    <div>
                        <p className="font-bold">1.2K</p>
                        <p>Followers</p>
                    </div>
                    <div>
                        <p className="font-bold">350</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            <Button className="mt-6 w-full">
                <Link href='/profile'>View Profile</Link>
            </Button>
        </div>
    );
};

export default LeftSideProfile;
