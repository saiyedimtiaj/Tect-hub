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

const UserInfoLarge: React.FC = () => {
    const [isEditProfileOpen, setEditProfileOpen] = useState<boolean>(false);
    const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetUser()

    const user = data?.data

    return (
        isLoading ? <Loading /> : <div className='relative'>
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est error qui nihil natus sequi? Culpa!
                        </p>

                        <div className="flex justify-center items-center gap-8 mt-2">
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">10</p>
                                <p className="text-gray-600 text-sm md:text-base">Followers</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">20</p>
                                <p className="text-gray-600 text-sm md:text-base">Following</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xl md:text-2xl font-semibold">5</p>
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
    );
};

export default UserInfoLarge;
