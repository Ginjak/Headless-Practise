"use client";
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
import Head from "next/head";

export default function Slider({ images }) {
  return (
    <>
      <Head>
        {/* Preload the first image to improve LCP */}
        <link rel="preload" href={images[0]?.source_url} as="image" />
      </Head>

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
              <div className="relative w-full h-full">
                {/* Image with blur effect */}
                <Image
                  src={image?.source_url}
                  alt={image?.alt_text}
                  className="object-cover transition-opacity duration-300"
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
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
    </>
  );
}
