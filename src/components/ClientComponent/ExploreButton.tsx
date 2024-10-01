"use client"
import { useUser } from '@/provider/user.provider';
import { useRouter } from 'next/navigation'
import React from 'react'

const ExploreButton = () => {
    const router = useRouter();
    const { user } = useUser()
    const handleNavigation = () => {
        if (user?.email) {
            router.push("/news-feed")
        } else {
            router.push("/")
        }
    }
    return (
        <>
            <button
                onClick={handleNavigation}
                className="inline-block bg-white text-purple-600 font-semibold px-4 py-2.5 md:text-base text-sm md:px-6 md:py-3 rounded-lg transition duration-300 hover:bg-gray-200 hover:shadow-lg shadow-lg"
            >
                Explore Now
            </button>
        </>
    )
}

export default ExploreButton
