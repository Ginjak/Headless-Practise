"use client";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  TbSquareRoundedArrowLeftFilled,
  TbSquareRoundedArrowRightFilled,
} from "react-icons/tb";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";

export default function SimilarPropertiesSlider({ data }) {
  console.log("data for slider", data);
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          100: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          150: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: {
            // For screens >= 640px
            slidesPerView: 3,
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
        className=""
      >
        {data.map((property) => (
          <SwiperSlide key={property?.ID}>
            <Link href={property?.slug}>
              <div className=" rounderd-xl">
                <div className="relative w-full h-44 sm:h-48 rounded-t-xl">
                  <Image
                    src={
                      property?.image?.media_details?.sizes?.medium?.source_url
                    }
                    alt={property?.image?.alt_text || "Property image"}
                    className="object-cover rounded-t-xl"
                    fill
                  />
                </div>
                <h5>£{property?.original_price}</h5>
                <div>
                  <p>Flat</p>
                  <div>
                    <p>Bedrooms</p>
                    <p>Bathrooms</p>
                  </div>
                </div>
                <p>Address</p>
              </div>
            </Link>
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
