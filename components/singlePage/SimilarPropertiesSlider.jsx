"use client";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  TbSquareRoundedArrowLeftFilled,
  TbSquareRoundedArrowRightFilled,
} from "react-icons/tb";
import Image from "next/image"; // Import the Image component from Next.js

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";

export default function SimilarPropertiesSlider({ data }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          640: {
            // For screens >= 640px
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            // For screens >= 1024px
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        className="h-[200px]"
      >
        {data.map((property) => (
          <SwiperSlide key={property?.ID}>
            {/* Using next/image for optimized image handling */}
            {/* <Image
              src={image?.source_url}
              alt={image?.alt_text}
              fill
              className="object-cover"
              priority
            /> */}
            <p>TEST</p>
            <Image
              src={property?.image?.guid?.rendered}
              width={250}
              height={250}
              alt={property?.image?.alt_text || "Property image"}
            />
            {/* <p>{property?.image?.guid?.rendered}</p> */}
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
