import {
  BiSolidCameraMovie,
  BiSolidCarGarage,
  BiSolidCctv,
} from "react-icons/bi";
import { FaHotTubPerson, FaRoad } from "react-icons/fa6";
import { GiFireplace, GiFlowerPot, GiRingingAlarm } from "react-icons/gi";
import {
  MdDeck,
  MdOutlineBalcony,
  MdOutlinePets,
  MdOutlinePool,
  MdSportsTennis,
} from "react-icons/md";
import { PiStairsBold } from "react-icons/pi";
import { TbParkingCircleFilled } from "react-icons/tb";

export default function SinglePostFeatures({ title, features, pet_friendly }) {
  return (
    <>
      <h5 className="font-medium pb-3 md:pb-5 text-xl md:text-2xl tracking-wide text-property-txt-700">
        {title}
      </h5>
      <ul className="flex flex-row gap-5 flex-wrap">
        {features.map((feature) => {
          const featureIcons = {
            driveway: <FaRoad className="text-property-acc-100 h-6 w-6" />,
            garage: (
              <BiSolidCarGarage className="text-property-acc-100 h-6 w-6" />
            ),
            "off-street-parking": (
              <TbParkingCircleFilled className="text-property-acc-100 h-6 w-6" />
            ),
            garden: <GiFlowerPot className="text-property-acc-100 h-6 w-6" />,
            balcony: (
              <MdOutlineBalcony className="text-property-acc-100 h-6 w-6" />
            ),
            terrace: <MdDeck className="text-property-acc-100 h-6 w-6" />,
            patio: <MdDeck className="text-property-acc-100 h-6 w-6" />,
            "swimming-pool": (
              <MdOutlinePool className="text-property-acc-100 h-6 w-6" />
            ),
            jacuzzi: (
              <FaHotTubPerson className="text-property-acc-100 h-6 w-6" />
            ),
            "tennis-court": (
              <MdSportsTennis className="text-property-acc-100 h-6 w-6" />
            ),
            "cinema-room": (
              <BiSolidCameraMovie className="text-property-acc-100 h-6 w-6" />
            ),
            fireplace: (
              <GiFireplace className="text-property-acc-100 h-6 w-6" />
            ),
            basement: (
              <PiStairsBold className="text-property-acc-100 h-6 w-6" />
            ),

            cctv: <BiSolidCctv className="text-property-acc-100 h-6 w-6" />,
            "alarm-system": (
              <GiRingingAlarm className="text-property-acc-100 h-6 w-6" />
            ),
          };

          const formattedFeature = feature
            .replace(/-/g, " ")
            .replace(/^(.)/, (match) => match.toUpperCase());

          return (
            <li key={feature} className="flex gap-2 items-center min-w-40">
              {featureIcons[feature]}
              <span className="text-property-txt-700">
                {formattedFeature === "Cctv" ? "CCTV" : formattedFeature}
              </span>
            </li>
          );
        })}
        {pet_friendly === "true" && (
          <li className="flex gap-2 items-center min-w-40">
            <MdOutlinePets className="text-property-acc-100 h-6 w-6" />
            <span className="text-property-txt-700">Pet friendly</span>
          </li>
        )}
      </ul>
    </>
  );
}
