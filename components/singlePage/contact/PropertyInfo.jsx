import ImageWithSpinner from "@/components/ImageWithSpinner";
import Image from "next/image";
import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import { TbBathFilled } from "react-icons/tb";

export default function PropertyInfo({
  image,
  alt,
  data,
  companyLogo,
  companyLogoAlt,
}) {
  return (
    <div className="rounded-xl flex flex-col sm:flex-row lg:flex-col bg-property-txt-700/5 border-[1px] border-property-txt-700/10 sm:shadow-md">
      <ImageWithSpinner
        src={image}
        alt={alt}
        width={"640"}
        height={"400"}
        className={
          "rounded-t-xl sm:rounded-none sm:rounded-l-xl lg:rounded-none lg:rounded-t-xl  sm:max-w-80 lg:max-w-full object-cover lg:object-contain"
        }
        priority={"priority"}
        spinnerClassName={
          "rounded-t-xl sm:rounded-none sm:rounded-l-xl lg:rounded-none lg:rounded-t-xl"
        }
      />

      <div className="p-4 flex flex-col gap-2 w-full">
        <p className="text-property-txt-700 text-xl font-bold tracking-wide">
          £
          {data?.original_price &&
            new Intl.NumberFormat().format(data.original_price)}
        </p>
        <p className="text-property-txt-700 text-lg font-medium tracking-wide">
          {data?.bedrooms} bed {data?.property_type} for sale{" "}
        </p>
        <p className="font-normal text-property-txt-700/60">
          {data?.address_line}, {data?.borough ? data?.borough : data?.city}{" "}
          {data?.postcode?.split(" ")[0]}
        </p>
        <div className="flex gap-2">
          <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
            <IoIosBed className="text-property-acc-100" /> {data?.bedrooms}
          </p>
          <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
            <TbBathFilled className="text-property-acc-100" />
            {data?.bathrooms}
          </p>
          {data?.receptions && (
            <p className="flex items-center gap-1 text-property-txt-700  pe-2 border-r-[1px] border-property-txt-700/20 last:border-0">
              <PiArmchairFill className="text-property-acc-100" />
              {data?.receptions}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-col">
            {data?.team_member?.team_member_name && (
              <>
                <p className="text-property-txt-700/60 text-xs">Agent</p>
                <p className="text-property-txt-700 font-medium">
                  {data?.team_member?.team_member_name}{" "}
                  {data?.team_member?.team_member_surname}
                </p>
              </>
            )}
          </div>
          <ImageWithSpinner
            src={companyLogo}
            alt={companyLogoAlt}
            width={"100"}
            height={"400"}
            loading={"lazy"}
            spinnerClassName={"z-10 rounded-xl"}
            fillContainerClassName={"max-h-14"}
          />
        </div>
      </div>
    </div>
  );
}
