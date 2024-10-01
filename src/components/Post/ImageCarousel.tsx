import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [swiperRef, setSwiperRef] = useState<any>(null);

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                slidesPerView={1} // Change this to desired number of slides per view
                onSwiper={setSwiperRef}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="mySwiper"
            >
                {images?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="w-full h-[240px] md:h-[300px] lg:h-[350px] object-cover rounded-lg"
                            src={image}
                            alt={`Image ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Customized Navigation Buttons with Lucide Icons */}
            <button
                className="z-50 text-white bg-gray-800 rounded-full absolute top-1/2 left-2 transform -translate-y-1/2 p-1"
                onClick={() => swiperRef.slidePrev()}
            >
                <ChevronLeft />
            </button>

            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-50 text-white bg-gray-800 rounded-full p-1"
                onClick={() => swiperRef.slideNext()}
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default ImageCarousel;
