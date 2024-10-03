import AllPosts from "@/components/NewsFeed/AllPosts";
import KnowPeople from "@/components/NewsFeed/KnowPeople";
import LeftSideProfile from "@/components/NewsFeed/LeftSideProfile";
import React from "react";

const Newsfeed = () => {
    return (
        <div className="flex min-h-screen items-start container mx-auto px-4">
            {/* Left Sidebar */}
            <LeftSideProfile />

            {/* Middle Section - Posts */}
            <div className="lg:w-2/4 w-full lg:px-6 pb-5">
                <AllPosts />
            </div>

            {/* Right Sidebar - People You May Know */}
            <KnowPeople />
        </div>
    );
};

export default Newsfeed;
