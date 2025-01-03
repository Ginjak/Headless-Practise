"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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

export default function Slider({ images }) {
  console.log("Received images:", images);

  // const imageArray = typeof images === "string" ? images.split(",") : images;

  // if (!Array.isArray(imageArray)) {
  //   return <div>Error: images prop is not a valid array or string.</div>;
  // }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[500px] rounded-xl"
        // priority
      >
        {images.map((image) => (
          <SwiperSlide key={image?.id}>
            {/* Using next/image for optimized image handling */}
            <Image
              src={image?.source_url}
              alt={image?.alt_text}
              fill
              className="object-cover"
              priority
            />
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
