import Link from "next/link";
import { IoIosBed } from "react-icons/io";
import { TbBathFilled } from "react-icons/tb";
import { RiCustomSize } from "react-icons/ri";

import ImageWithSpinner from "../ImageWithSpinner";
import SinglePostDivider from "../singlePage/SinglePostDivider";
import AgentDetails from "./AgentDetails";
import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <div
      className="flex flex-col h-full rounded-xl border-[1px] border-property-txt-700/10 shadow-md"
      key={property?.ID}
    >
      <Link
        href={`/${property?.post_type}/${property?.slug}`}
        className="min-h-44 xs:min-h-28 sm:min-h-48 tab:min-h-32 2xl:min-h-40"
      >
        <Image
          src={
            property?.imageUrl?.media_details?.sizes?.medium_large
              ?.source_url ||
            property?.guid?.rendered ||
            "/image_placeholder.webp"
          }
          alt={property?.imageUrl?.alt_text || "Image placeholder"}
          width={365}
          height={230}
          className={"rounded-t-lg w-full xs:w-auto"}
          priority
        />
      </Link>

      <div className="p-4 xs:p-2 sm:p-4 flex flex-col justify-between grow">
        <Link href={`/${property?.post_type}/${property?.slug}`}>
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
        </Link>
        {property?.team_member_picture && (
          <AgentDetails
            property={property}
            agentImgId={property?.team_member_picture}
          />
        )}
      </div>
    </div>
  );
}
