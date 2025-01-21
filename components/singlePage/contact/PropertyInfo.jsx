import Image from "next/image";
import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import { TbBathFilled } from "react-icons/tb";

export default function PropertyInfo({ image, data }) {
  console.log("image", image);
  return (
    <div className="rounded-xl bg-property-txt-700/5">
      <Image
        src={image?.guid?.rendered}
        alt={image?.alt_text}
        width={400} // Set display size here
        height={400} // Set display size here
        className="rounded-t-xl"
        priority
      />
      <div className="p-4 flex flex-col gap-2">
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
      </div>
    </div>
  );
}
