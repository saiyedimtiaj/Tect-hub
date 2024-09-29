"use client";
import React, { useState } from 'react';
import { useUser } from "@/provider/user.provider";
import Image from "next/image";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from '../ui/button';
import { FaPlus } from "react-icons/fa6";
import EditProfile from '../Modal/EditProfile';

const UserInfoLarge: React.FC = () => {
    const { user } = useUser();
    const [isEditProfileOpen, setEditProfileOpen] = useState<boolean>(false);

    return (
        <div className="absolute -mt-16 flex flex-col items-center w-full">
            {/* Profile Image */}
            <Image
                width={150}
                height={150}
                src={user?.profile || "/default-profile.jpg"}
                alt="User Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
            />

            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-4 w-full px-4">
                {/* User Info */}
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 pb-2">{user?.name || "User Name"}</h1>

                    <div className="flex justify-center sm:justify-start items-center gap-8 mt-2">
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
                    <button className="gap-2 font-semibold py-2 px-4 md:py-2.5 md:px-5 rounded-lg flex items-center bg-purple-600 text-white text-xs md:text-lg">
                        <FaPlus size={19} />
                        Add Post
                    </button>
                </div>
            </div>
            <EditProfile isOpen={isEditProfileOpen} onOpenChange={setEditProfileOpen} />
        </div>
    );
};

export default UserInfoLarge;
