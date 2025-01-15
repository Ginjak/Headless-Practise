"use client";
import { useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  TbSquareRoundedArrowLeftFilled,
  TbSquareRoundedArrowRightFilled,
} from "react-icons/tb";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ images }) {
  // Track loading state for each image
  const [loadingStates, setLoadingStates] = useState(
    Array(images.length).fill(true)
  );

  const handleImageLoad = (index) => {
    setLoadingStates((prev) =>
      prev.map((isLoading, i) => (i === index ? false : isLoading))
    );
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        className="h-[500px] rounded-xl shadow-small"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image?.id}>
            <div className="relative h-full">
              {/* Show spinner while image is loading */}
              {loadingStates[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {/* Using next/image for optimized image handling */}
              <Image
                src={image?.source_url}
                alt={image?.alt_text}
                className={`object-cover transition-opacity duration-300 ${
                  loadingStates[index] ? "opacity-0" : "opacity-100"
                }`}
                fill
                priority={index === 0}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          </SwiperSlide>
        ))}

        <div
          className="custom-prev absolute right-16 bottom-0 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
          style={{ pointerEvents: "auto" }}
        >
          <TbSquareRoundedArrowLeftFilled />
        </div>
        <div
          className="custom-next absolute right-5 bottom-0 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
          style={{ pointerEvents: "auto" }}
        >
          <TbSquareRoundedArrowRightFilled />
        </div>
      </Swiper>
    </div>
  );
}
