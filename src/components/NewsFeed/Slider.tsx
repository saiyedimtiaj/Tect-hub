import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Navigation, Pagination } from 'swiper/modules';
import { useCreateFollowRequest, useGetMayIKnowUser } from '@/hooks/user.hooks';
import { TUser } from '@/types';
import Image from 'next/image';


const Slider = () => {
    const { data, refetch } = useGetMayIKnowUser();
    const { mutate: followRequest } = useCreateFollowRequest()
    const handleFollowRequest = (followId: string) => {
        const data = { followId }
        followRequest(data, {
            onSuccess: () => {
                refetch()
            }
        })
    }
    return (
        <div className='py-3 bg-white px-2'>
            <h1 className="text-lg font-semibold">People You May Know</h1>
            <div className='mt-3'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20} // space between slides
                    slidesPerView={3} // number of slides visible at the same time
                    navigation // adds navigation buttons
                    pagination={{ clickable: true }} // adds pagination
                    loop={true}
                    autoplay={{
                        delay: 3000, // Delay between slides in ms (3 seconds)
                        disableOnInteraction: false, // Keeps autoplay even if user interacts
                    }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        // when window width is >= 640px
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        // when window width is >= 1024px
                        680: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {data?.data.map((person: TUser) => (
                        <SwiperSlide key={person._id}>
                            <div className='bg-gray-100 p-4 rounded-lg shadow-md text-center'>
                                <Image
                                    width={100}
                                    height={100}
                                    src={person.profile}
                                    alt={person.name}
                                    className='w-full h-32 object-cover rounded-md mb-3'
                                />
                                <h2 className='font-medium'>{person.name}</h2>
                                <button onClick={() => handleFollowRequest(person?._id)} className='bg-blue-500 mt-1 w-full font-medium py-1.5 text-white rounded-md'>Follow</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Slider;
