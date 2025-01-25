import { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { fetchImageById } from "@/lib/api";
import ImageWithSpinner from "./ImageWithSpinner";

import { TbBathFilled } from "react-icons/tb";
import { IoIosBed } from "react-icons/io";
import { RiCustomSize } from "react-icons/ri";
import { BsEnvelopeAt } from "react-icons/bs";
import SinglePostDivider from "./singlePage/SinglePostDivider";

export default function Property({ property }) {
  // State to store the fetched image data
  const [propertyImg, setPropertyImg] = useState(null);
  const [agentImg, setAgentImg] = useState(null);

  useEffect(() => {
    // Fetch image data when the component mounts
    const fetchData = async () => {
      const results = await Promise.allSettled([
        fetchImageById(property?.featured_image),
        fetchImageById(property?.team_member_picture),
      ]);

      // Handle results
      if (results[0].status === "fulfilled") {
        setPropertyImg(results[0].value);
      } else {
        return;
        console.error("Error fetching the first image:", results[0].reason);
      }

      if (results[1].status === "fulfilled") {
        setAgentImg(results[1].value);
      } else {
        return;
        console.error("Error fetching the second image:", results[1].reason);
      }
    };

    fetchData();
  }, []);

  return (
    <Link
      href={`/${property?.post_type}/${property?.slug}`}
      className="rounded-xl border-[1px] border-property-txt-700/10 shadow-md"
    >
      <div className="flex flex-col h-full">
        <ImageWithSpinner
          src={
            propertyImg?.media_details?.sizes?.medium_large?.source_url ||
            propertyImg?.guid?.rendered ||
            "/image_placeholder.webp"
          }
          alt={propertyImg?.alt_text || "Image placeholder"}
          width={365}
          height={230}
          spinnerWraperClassName={"max-h-56"}
          className={"rounded-t-lg w-full xs:w-auto"}
          fillContainerClassName={"max-h-56 h-full"}
          priority={"true"}
        />

        <div className="p-4 xs:p-2 sm:p-4 flex flex-col justify-between grow">
          <div>
            <div className="flex xs:flex-col sm:flex-row justify-between mb-2">
              <p className="text-property-txt-700 text-lg xs:text-base sm:text-lg font-bold tracking-wide">
                £
                {property?.original_price &&
                  new Intl.NumberFormat().format(property?.original_price)}
              </p>
              <p className="text-property-txt-700 xs:text-sm sm:text-base">
                {property?.property_type?.charAt(0).toUpperCase() +
                  property?.property_type?.slice(1)}
              </p>
            </div>
            <p className="text-property-txt-700 tracking-wide mb-4 xs:text-sm sm:text-base">
              {property?.address_line},{" "}
              {property?.borough ? property?.borough : property?.city}{" "}
              {property?.postcode?.split(" ")[0]}
            </p>
            <div className="flex gap-2 xs:flex-col sm:flex-row">
              <p className="flex items-center gap-1 text-property-txt-700  pe-2 xs:pe-0 sm:pe-2 border-r-[1px] xs:border-r-[0px] sm:border-r-[1px] border-property-txt-700/20 last:border-0">
                <IoIosBed className="text-property-acc-100" />{" "}
                <span className="text-sm">{property?.bedrooms}</span>
              </p>
              <p className="flex items-center gap-1 text-property-txt-700  pe-2 xs:pe-0 sm:pe-2 border-r-[1px] xs:border-r-[0px] sm:border-r-[1px] border-property-txt-700/20 last:border-0">
                <TbBathFilled className="text-property-acc-100" />
                <span className="text-sm">{property?.bathrooms}</span>
              </p>
              {property?.receptions && (
                <p className="flex items-center gap-1 text-property-txt-700  pe-2 xs:pe-0 sm:pe-2 border-r-[1px] xs:border-r-[0px] sm:border-r-[1px] border-property-txt-700/20 last:border-0">
                  <RiCustomSize className="text-property-acc-100" />
                  <span className="text-sm">
                    {property?.size_in_sq_ft &&
                      new Intl.NumberFormat().format(property?.size_in_sq_ft)}
                  </span>{" "}
                  <span className="text-xs">sq ft</span>
                </p>
              )}
            </div>
          </div>
          {property?.team_member_id && (
            <div>
              <SinglePostDivider className={"my-3"} />
              <div className="flex xs:flex-col sm:flex-row items-between gap-4">
                <div className="flex justify-start xs:justify-between sm:justify-start gap-3 items-center w-full">
                  <ImageWithSpinner
                    src={
                      agentImg?.media_details?.sizes?.thumbnail?.source_url ||
                      agentImg?.guid?.rendered ||
                      "/agent_placeholder.webp"
                    }
                    alt={agentImg?.alt_text || "Agent avart image"}
                    width={40}
                    height={40}
                    className={"rounded-full"}
                    spinnerClassName={"bg-transparent"}
                  />

                  <p className="flex flex-col leading-none text-sm text-property-txt-700">
                    {property?.team_member_name}{" "}
                    <span>{property?.team_member_surname}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`tel:${property?.team_member_phone}`}
                    className="p-2 bg-property-acc-100 hover:bg-property-acc-300 rounded-lg text-white transition-colors duration-300 w-auto flex justify-center xs:w-full sm:width-auto text-center "
                  >
                    <FaPhone />
                  </Link>
                  <Link
                    href={`${property?.post_type}/${property?.slug}/contact`}
                    className="p-2 bg-property-acc-100 hover:bg-property-acc-300 rounded-lg text-white transition-colors duration-300 w-auto flex justify-center xs:w-full sm:width-auto text-center"
                  >
                    <BsEnvelopeAt />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
