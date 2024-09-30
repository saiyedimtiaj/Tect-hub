import AllPosts from "@/components/NewsFeed/AllPosts";
import LeftSideProfile from "@/components/NewsFeed/LeftSideProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from "react";

const Newsfeed = () => {
    return (
        <div className="flex min-h-screen items-start container mx-auto px-4">
            {/* Left Sidebar */}
            <LeftSideProfile />

            {/* Middle Section - Posts */}
            <div className="w-2/4 px-6 pb-5">
                <AllPosts />
            </div>

            {/* Right Sidebar - People You May Know */}
            <div className="w-1/4 p-6 bg-white">
                <h3 className="font-bold text-lg mb-4">People You May Know</h3>
                <div className="space-y-4">
                    {/* User Card */}
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12" />
                                <div className="flex-1">
                                    <h4 className="font-bold">User {index + 1}</h4>
                                    <Button variant="outline" size="sm">
                                        Follow
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Newsfeed;
