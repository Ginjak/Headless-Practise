import { IoIosBed } from "react-icons/io";
import { PiArmchairFill } from "react-icons/pi";
import { RiCustomSize } from "react-icons/ri";
import { TbBathFilled } from "react-icons/tb";

export default function KeyFeatures({ bedrooms, bathrooms, receptions, size }) {
  return (
    <>
      <div className="key-features flex flex-wrap">
        {bedrooms && bedrooms !== "0" && (
          <div className="bedrooms-wraper flex flex-col gap-1 py-3 pe-4">
            <p className="text-property-txt-700 font-medium">Bedrooms</p>
            <p className="flex items-center gap-2">
              <span>
                <IoIosBed className="text-property-acc-100 h-6 w-6" />
              </span>
              <span className="font-bold text-property-txt-700 text-lg">
                {bedrooms?.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        )}
        {bathrooms && bathrooms !== "0" && (
          <div className="bathrooms-wraper flex flex-col gap-1 py-3 pe-4">
            <p className="text-property-txt-700 font-medium">Bathrooms</p>
            <p className="flex items-center gap-2">
              <span>
                <TbBathFilled className="text-property-acc-100 h-6 w-6" />
              </span>
              <span className="font-bold text-property-txt-700 text-lg">
                {bathrooms?.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        )}
        {receptions && receptions !== "0" && (
          <div className="receptions-wraper flex flex-col gap-1 py-3 pe-4">
            <p className="text-property-txt-700 font-medium">Receptions</p>
            <p className="flex items-center gap-2">
              <span>
                <PiArmchairFill className="text-property-acc-100 h-6 w-6" />
              </span>
              <span className="font-bold text-property-txt-700 text-lg">
                {receptions?.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        )}
        {size && size !== "0" && (
          <div className="area-size-wraper flex flex-col gap-1 py-3 pe-4">
            <p className="text-property-txt-700 font-medium">Area</p>
            <p className="flex items-center gap-2">
              <span>
                <RiCustomSize className="text-property-acc-100 h-6 w-6" />
              </span>
              <span className="font-bold  text-property-txt-700 text-lg">
                {size && new Intl.NumberFormat().format(size)}{" "}
                <span className="text-xs text-property-txt-700/80 font-medium">
                  sq ft
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
