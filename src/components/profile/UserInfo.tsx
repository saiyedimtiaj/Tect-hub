"use client";
import React, { useState } from 'react';
import Image from "next/image";
import banner from "../../../public/assets/cover.jpg";
import Loading from '../shared/Loading';
import { useGetInfo } from '@/hooks/auth.hook';
import { useParams } from 'next/navigation';
import UserPost from './UserPost';
import { useCreateFollowRequest } from '@/hooks/user.hooks';
import { useUser } from '@/provider/user.provider';
import { SlUserFollowing } from "react-icons/sl";

const UserInfo = () => {
    const { user: meAsUser } = useUser()
    const { id } = useParams()
    const { data, isLoading, isFetching, refetch } = useGetInfo(id as string)
    const { mutate: followRequest } = useCreateFollowRequest()
    const user = data?.data
    const handleFollowRequest = () => {
        const data = { followId: id as string }
        followRequest(data, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    const isFollow = user?.followers?.find((u: { userId: string }) => u.userId === meAsUser?._id)

    return (
        isLoading || isFetching ? <Loading /> : <div className='relative'>
            <Image
                width={800}
                height={100}
                alt="banner"
                src={banner}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-md"
            />
            <div className="-mt-16 flex flex-col items-center justify-center w-full">
                {/* Profile Image */}
                <Image
                    width={150}
                    height={150}
                    src={user?.profile || "/default-profile.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
                />

                <div className="flex flex-col justify-center items-center mt-4 w-full px-4">
                    {/* User Info */}
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 pb-2">{user?.name || "User Name"}</h1>
                        <p className='text-center max-w-[400px] mb-5'>
                            {user?.bio}
                        </p>

                        <div className="flex justify-center items-center gap-8 mt-2">
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">{user?.followers?.length}</p>
                                <p className="text-gray-600 text-sm md:text-base">Followers</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">{user?.following?.length}</p>
                                <p className="text-gray-600 text-sm md:text-base">Following</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">{user?.postCount}</p>
                                <p className="text-gray-600 text-sm md:text-base">Posts</p>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="mt-4 flex items-center gap-4">
                        {
                            isFollow ? <button className='bg-purple-500 font-medium px-5 py-2 rounded-md text-white flex items-center gap-1'><SlUserFollowing /><p>Following</p></button> : id === meAsUser?._id ? "" : <button onClick={handleFollowRequest} className='bg-purple-500 font-medium px-5 py-2 rounded-md text-white'>Follow</button>
                        }
                    </div>
                </div>
            </div>
            <div>
                <UserPost id={id as string} />
            </div>
        </div>
    );
}

export default UserInfo
