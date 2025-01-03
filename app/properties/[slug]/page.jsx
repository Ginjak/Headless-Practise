import { fetchCptSinglePost, fetchImageData } from "@/lib/api";
import { IoIosBed } from "react-icons/io";
import { TbBathFilled } from "react-icons/tb";
import { PiArmchairFill, PiStairsBold } from "react-icons/pi";
import { RiCustomSize } from "react-icons/ri";
import { FaRoad, FaHotTubPerson } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";
import { TbParkingCircleFilled } from "react-icons/tb";
import { GiFlowerPot, GiFireplace, GiRingingAlarm } from "react-icons/gi";
import { BiSolidCameraMovie, BiSolidCctv } from "react-icons/bi";
import {
  MdOutlineBalcony,
  MdDeck,
  MdOutlinePool,
  MdSportsTennis,
} from "react-icons/md";
import Slider from "@/components/Slider";
export default async function Page({ params }) {
  const { slug } = await params; // No need to await params

  // Fetch data using the async function
  const data = await fetchCptSinglePost("properties", slug);
  console.log("Single property page data", data);

  const images = await fetchImageData(data.slider_images.split(","));
  console.log("Image Data", images);

  // Check if data is available and render accordingly
  if (data && data.ID) {
    return (
      <>
        <p>Back to search + Share buttons</p>
        <div className="2xl:container mx-auto flex">
          <div className="content w-2/3">
            <div className="slider-wraper mb-6">
              <Slider images={images} />
            </div>
            <div className="main-details-wraper mb-6 mx-10">
              <h2 className="text-mainTxt font-heading text-2xl font-medium tracking-wide">
                {data?.address_line},{" "}
                {data?.borough ? data?.borough : data?.city}{" "}
                {data?.postcode?.split(" ")[0]}
              </h2>

              <div className="price-date-wraper flex justify-between items-center">
                <p className="text-mainTxt font-heading text-2xl font-medium tracking-wide">
                  £{data?.original_price}
                </p>
                <p className="text-mainTxt-ligther font-heading opacity-70">
                  Added on{" "}
                  {new Date(data?.post_date)
                    .toLocaleDateString("en-GB")
                    .replace(/-/g, "/")}
                </p>
              </div>
            </div>
            <div className="description-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full mb-6">
              <h5 className="font-heading font-medium pb-5 text-2xl tracking-wide">
                Description
              </h5>
              <p className="text-white/80">{data?.property_description}</p>
              <div className="w-full bg-white/80 h-[1px] opacity-50 my-5"></div>
              <div className="key-features flex flex-wrap">
                {data?.bedrooms && data?.bedrooms !== "0" && (
                  <div className="bedrooms-wraper flex flex-col gap-1 py-3 pe-4">
                    <p className="text-white/80">Bedrooms</p>
                    <p className="flex items-center gap-2">
                      <span>
                        <IoIosBed className="text-white h-6 w-6" />
                      </span>
                      <span className="font-bold text-white text-lg">
                        {data?.bedrooms?.toString().padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                )}
                {data?.bathrooms && data?.bathrooms !== "0" && (
                  <div className="bathrooms-wraper flex flex-col gap-1 py-3 pe-4">
                    <p className="text-white/80">Bathrooms</p>
                    <p className="flex items-center gap-2">
                      <span>
                        <TbBathFilled className="text-white h-6 w-6" />
                      </span>
                      <span className="font-bold text-white text-lg">
                        {data?.bathrooms?.toString().padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                )}
                {data?.receptions && data?.receptions !== "0" && (
                  <div className="receptions-wraper flex flex-col gap-1 py-3 pe-4">
                    <p className="text-white/80">Receptions</p>
                    <p className="flex items-center gap-2">
                      <span>
                        <PiArmchairFill className="text-white h-6 w-6" />
                      </span>
                      <span className="font-bold text-white text-lg">
                        {data?.receptions?.toString().padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                )}
                {data?.size_in_sq_ft && data?.size_in_sq_ft !== "0" && (
                  <div className="area-size-wraper flex flex-col gap-1 py-3 pe-4">
                    <p className="text-white/80">Area</p>
                    <p className="flex items-center gap-2">
                      <span>
                        <RiCustomSize className="text-white h-6 w-6" />
                      </span>
                      <span className="font-bold text-white text-lg">
                        {data?.size_in_sq_ft?.toString().padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="features-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full mb-6">
              <h5 className="font-heading font-medium pb-5 text-2xl tracking-wide">
                Features
              </h5>
              <ul className="flex flex-row gap-5 flex-wrap">
                {data?.features.map((feature) => {
                  const featureIcons = {
                    driveway: <FaRoad className="text-white h-6 w-6" />,
                    garage: <BiSolidCarGarage className="text-white h-6 w-6" />,
                    "off-street-parking": (
                      <TbParkingCircleFilled className="text-white h-6 w-6" />
                    ),
                    garden: <GiFlowerPot className="text-white h-6 w-6" />,
                    balcony: (
                      <MdOutlineBalcony className="text-white h-6 w-6" />
                    ),
                    terrace: <MdDeck className="text-white h-6 w-6" />,
                    patio: <MdDeck className="text-white h-6 w-6" />,
                    "swimming-pool": (
                      <MdOutlinePool className="text-white h-6 w-6" />
                    ),
                    jacuzzi: <FaHotTubPerson className="text-white h-6 w-6" />,
                    "tennis-court": (
                      <MdSportsTennis className="text-white h-6 w-6" />
                    ),
                    "cinema-room": (
                      <BiSolidCameraMovie className="text-white h-6 w-6" />
                    ),
                    fireplace: <GiFireplace className="text-white h-6 w-6" />,
                    basement: <PiStairsBold className="text-white h-6 w-6" />,

                    cctv: <BiSolidCctv className="text-white h-6 w-6" />,
                    "alarm-system": (
                      <GiRingingAlarm className="text-white h-6 w-6" />
                    ),
                  };

                  const formattedFeature = feature
                    .replace(/-/g, " ")
                    .replace(/^(.)/, (match) => match.toUpperCase());

                  return (
                    <li
                      key={feature}
                      className="flex gap-2 items-center min-w-40"
                    >
                      {featureIcons[feature]}
                      <span className="text-white/80">
                        {formattedFeature === "Cctv"
                          ? "CCTV"
                          : formattedFeature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="agent-info w-1/3 p-4 sticky top-0 h-screen overflow-y-auto">
            <p>Agent name</p>
          </div>
        </div>
      </>
    );
  } else {
    return <p>No data found for {slug}</p>;
  }
}
