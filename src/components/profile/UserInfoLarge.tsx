"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { MdModeEditOutline } from "react-icons/md";
import banner from "../../../public/assets/cover.jpg";
import { FaPlus } from "react-icons/fa6";
import EditProfile from '../Modal/EditProfile';
import AddPost from '../Modal/AddPost';
import { useGetUser } from '@/hooks/auth.hook';
import Loading from '../shared/Loading';
import badge from "../../../public/assets/stamp.png"

const UserInfoLarge: React.FC = () => {
    const [isEditProfileOpen, setEditProfileOpen] = useState<boolean>(false);
    const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetUser()

    const user = data?.data

    const currentDate = new Date();
    const membershipEndDate = new Date(user?.membershipEnd);
    const isTimeOut = membershipEndDate < currentDate;


    return (
        isLoading ? <Loading /> : <>
            <div className='relative'>
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
                            <h1 className="text-2xl flex items-center gap-2 sm:text-3xl md:text-4xl font-bold text-gray-900 pb-2">{user?.name || "User Name"}
                                {
                                    user?.membershipEnd && !isTimeOut && <Image
                                        width={60}
                                        height={60}
                                        alt="banner"
                                        src={badge}
                                        className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] object-cover "
                                    />
                                }
                            </h1>
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
                            <button
                                onClick={() => setEditProfileOpen(true)}
                                className="gap-2 font-semibold py-2 px-4 md:py-2.5 md:px-5 rounded-lg flex items-center bg-black text-white text-xs md:text-lg"
                            >
                                <MdModeEditOutline size={19} />
                                Edit Profile
                            </button>
                            <button onClick={() => setIsPostOpen(true)} className="gap-2 font-semibold py-2 px-4 md:py-2.5 md:px-5 rounded-lg flex items-center bg-purple-600 text-white text-xs md:text-lg">
                                <FaPlus size={19} />
                                Add Post
                            </button>
                        </div>
                    </div>
                    <EditProfile isOpen={isEditProfileOpen} onOpenChange={setEditProfileOpen} />
                    <AddPost isOpen={isPostOpen} onOpenChange={setIsPostOpen} />
                </div>
            </div>

            <div className="mt-16 mb-20">

            </div>
        </>
    );
};

export default UserInfoLarge;
