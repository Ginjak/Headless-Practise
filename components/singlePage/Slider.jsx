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
import { useState } from "react";
import SmallSpinner from "../SmallSpinner";

export default function Slider({ imgIds, images }) {
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  console.log(imgIds);
  const handleImageLoad = () => {
    setIsFirstImageLoaded(true);
  };

  return (
    <>
      <Head>
        {/* Preload the first image to improve LCP */}
        {/* <link rel="preload" href={images[0]?.source_url} as="image" /> */}
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
          className="h-72 sm:h-96 md:h-[500px] rounded-xl shadow-small w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image?.id}>
              <div className="relative w-full h-full">
                {!isFirstImageLoaded && index === 0 && (
                  <SmallSpinner className={"rounded-xl"} />
                )}
                <Image
                  src={image?.source_url}
                  alt={image?.alt_text}
                  className="object-cover "
                  fill
                  sizes="(max-width: 500px) 500px, (max-width: 768px) 768px, (min-width: 768px) 1024px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={handleImageLoad}
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
