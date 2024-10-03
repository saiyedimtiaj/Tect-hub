import React from 'react'
import banner from "../../public/assets/404.svg"
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className='flex items-center justify-center min-h-screen gap-2 py-12 flex-col'>
            <Image src={banner} width={200} height={200} className='max-w-[400px] w-full h-full' alt='404' />
            <h1 className='text-2xl md:text-5xl font-bold'>404</h1>
            <h1 className='text-[20px] md:text-3xl font-bold'>Page Not Found!</h1>
            <p className='text-gray-500'>Either something went wrong or this page doesn&apost exist anymore.</p>
            <Link href="/">
                <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300'>
                    Go to Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound
