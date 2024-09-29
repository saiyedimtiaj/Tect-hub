import React from "react";
import Image from "next/image";
import banner from "../../../../public/assets/cover.jpg";
import UserInfoLarge from "@/components/profile/UserInfoLarge";
import AddPost from "@/components/profile/AddPost";

const Page = () => {


    return (
        <div className="container mx-auto px-4">
            {/* Cover Photo Section */}
            <div className="relative mt-3 ">
                <Image
                    width={800}
                    height={100}
                    alt="banner"
                    src={banner}
                    className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-md"
                />
                <UserInfoLarge />
            </div>
            <div className="mt-72 mb-20">
                <h1 className="text-3xl font-bold text-center">No Post Create</h1>
            </div>
        </div>
    );
};

export default Page;
