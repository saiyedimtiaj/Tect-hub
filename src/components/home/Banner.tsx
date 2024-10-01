"use client"
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import banner from '../../../public/assets/08-01.jpg';
import ExploreButton from '../ClientComponent/ExploreButton';

const Banner = () => {
    return (
        <section className="relative text-white min-h-[calc(100vh-90px)] pb-[10px] flex items-center justify-center">
            {/* Background Image with Opacity */}
            <div className="absolute inset-0">
                <Image
                    width={700}
                    height={400}
                    src={banner}
                    alt="Tech Tips"
                    className="w-full h-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-55"></div> {/* Overlay for opacity */}
            </div>

            {/* Centered Content */}
            <div className="container mx-auto px-3 py-4 flex flex-col items-center relative z-10 text-center">
                {/* Animated Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-5xl font-bold leading-tight mb-4"
                >
                    Welcome to the Tech Tips & Tricks Hub
                </motion.h1>

                {/* Animated Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm md:text-xl mb-6 max-w-5xl mx-auto"
                >
                    Join our community to discover valuable tips, tutorials, and insights. Enhance your tech skills and connect with fellow enthusiasts. Explore Now to start your journey towards mastering new technologies!
                </motion.p>

                {/* Animated Explore Button */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <ExploreButton />
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
