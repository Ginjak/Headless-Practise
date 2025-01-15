"use client";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import { TbBathFilled } from "react-icons/tb";
import ShareOnSocials from "./singlePage/ShareOnSocials";

export default function ShareButton({ data, image }) {
  const {} = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    // Handle submit logic
    alert("Form Submitted!");
    closeModal(); // Close modal after submit
  };

  return (
    <div className="p-6">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Modal
      </button>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="font-bold pb-5 text-2xl tracking-wide text-property-txt-700">
          Share this property
        </h3>
        <div className="flex gap-3 pb-3">
          <Image
            src={image?.guid?.rendered}
            alt={image?.alt_text || "Property image"}
            width={150}
            height={150}
          />
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
