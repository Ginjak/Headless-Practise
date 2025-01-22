"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  TbSquareRoundedArrowLeftFilled,
  TbSquareRoundedArrowRightFilled,
  TbBathFilled,
} from "react-icons/tb";
import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import SmallSpinner from "../SmallSpinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SimilarPropertiesSlider({ data }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          250: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
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
        className="mb-10"
      >
        {data.map((property) => (
          <SwiperSlide key={property?.ID}>
            <Link href={property?.slug} className="h-full">
              <div className="rounded-xl bg-property-txt-700/5 ">
                <div className="relative w-full h-72 sm:h-48 rounded-t-xl ">
                  {!imageLoaded && <SmallSpinner className="rounded-xl" />}
                  <Image
                    src={
                      property?.image?.media_details?.sizes?.medium_large
                        ?.source_url || "/image_placeholder.webp"
                    }
                    alt={
                      property?.image?.alt_text || "Property image placeholder"
                    }
                    className="object-cover rounded-t-xl"
                    fill
                    sizes="(max-width: 639px) 640px, (min-width: 640px) 320px"
                    loading="lazy"
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="flex flex-col gap-2 px-2 py-4">
                  <div className="flex justify-between text-property-txt-700 font-medium">
                    <h5>£{property?.original_price}</h5>
                    <p>
                      {property?.property_type?.charAt(0).toUpperCase() +
                        property?.property_type?.slice(1)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
                      <IoIosBed className="text-property-acc-100" />{" "}
                      {property?.bedrooms}
                    </p>
                    <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
                      <TbBathFilled className="text-property-acc-100" />
                      {property?.bathrooms}
                    </p>
                    {property?.receptions && (
                      <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
                        <PiArmchairFill className="text-property-acc-100" />
                        {property?.receptions}
                      </p>
                    )}
                  </div>

                  <p className="font-normal text-property-txt-700 text-sm">
                    {property?.address_line},{" "}
                    {property?.borough ? property?.borough : property?.city}{" "}
                    {property?.postcode?.split(" ")[0]}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="hidden sm:flex justify-end my-4">
          <div
            className="custom-prev text-property-txt-700 text-3xl cursor-pointer z-10"
            style={{ pointerEvents: "auto" }}
          >
            <TbSquareRoundedArrowLeftFilled />
          </div>
          <div
            className="custom-next text-property-txt-700 text-3xl cursor-pointer z-10"
            style={{ pointerEvents: "auto" }}
          >
            <TbSquareRoundedArrowRightFilled />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
