"use client";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import { TbBathFilled } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import ShareOnSocials from "./singlePage/ShareOnSocials";
import SmallSpinner from "./SmallSpinner";

export default function ShareButton({ data, image, btnText, btnClass }) {
  const {} = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log("image object", image);
  const handleSubmit = () => {
    alert("Form Submitted!");
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className={`text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-200 transition-colors ${btnClass}`}
      >
        <FiShare2 />
        {btnText}
      </button>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="font-bold pb-5 text-2xl tracking-wide text-property-txt-700">
          Share this property
        </h3>
        <div className="flex gap-3 pb-3">
          <div className="relative w-[150px] h-[150px] ">
            {isImageLoading && <SmallSpinner />}
            <Image
              src={image?.media_details?.sizes?.thumbnail?.source_url}
              alt={image?.alt_text || "Property image"}
              fill
              className={`rounded-xl object-cover ${
                isImageLoading ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
              sizes="(max-width: 767px) 150px, (min-width: 768px) 150px"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </div>
          <div>
            <p className="text-property-txt-700 font-medium">
              {data?.address_line && (
                <>
                  {data.address_line}
                  <br />
                </>
              )}
              {data?.borough && (
                <>
                  {data.borough}
                  <br />
                </>
              )}
              {data?.city && (
                <>
                  {data.city}
                  <br />
                </>
              )}
              {data?.postcode?.split(" ")[0] && (
                <>
                  {data.postcode.split(" ")[0]}
                  <br />
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-between text-property-txt-700 font-medium">
          £{new Intl.NumberFormat().format(data.original_price)}
          <ul className="flex">
            {data?.bedrooms && (
              <li className="flex content-center items-center gap-1 px-3 border-r-2 border-property-txt-700/20 last:border-0">
                <IoIosBed className="text-property-acc-100" />
                {data?.bedrooms}
              </li>
            )}
            {data?.bathrooms && (
              <li className="flex content-center items-center gap-1 px-3 border-r-2 border-property-txt-700/20 last:border-0">
                <TbBathFilled className="text-property-acc-100" />
                {data?.bathrooms}
              </li>
            )}
            {data?.receptions && (
              <li className="flex content-center items-center gap-1 px-3 border-r-2 border-property-txt-700/20 last:border-0">
                <PiArmchairFill className="text-property-acc-100" />
                {data?.receptions}
              </li>
            )}
          </ul>
        </div>
        <ShareOnSocials postData={data} />
      </Modal>
    </div>
  );
}
