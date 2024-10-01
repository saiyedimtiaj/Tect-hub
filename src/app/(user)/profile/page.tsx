import React from "react";
import UserInfoLarge from "@/components/profile/UserInfoLarge";
import MyPost from "@/components/profile/MyPost";

const Page = () => {


    return (
        <div className="container mx-auto px-4">
            {/* Cover Photo Section */}
            <div className="mt-3 ">
                <UserInfoLarge />
            </div>
            <div className="mt-16 mb-20">
                <MyPost />
            </div>
        </div>
    );
};

export default Page;
