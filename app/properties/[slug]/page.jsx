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
  MdOutlinePets,
} from "react-icons/md";
import Slider from "@/components/Slider";
import Link from "next/link";
import { bebas } from "@/app/fonts/BebasFont";
import Image from "next/image";
import AgentSinglePage from "@/components/AgentSinglePage";

export default async function Page({ params }) {
  const { slug } = await params; // No need to await params

  // Fetch data using the async function
  const data = await fetchCptSinglePost("properties", slug);
  console.log("Single property page data", data);

  const images = await fetchImageData(data.slider_images.split(","));
  console.log("Image Data", images);

  const [companyLogo, memberPhoto] = await fetchImageData([
    data.team_member_company_logo,
    data.team_member_picture,
  ]);

  const imageId = [data.team_member_company_logo, data.team_member_picture];

  console.log("Image id testing now", imageId);
  console.log("Company logo", companyLogo);
  console.log("Team avatar", memberPhoto);

  // Check if data is available and render accordingly
  if (data && data.ID) {
    return (
      <>
        <p>Back to search + Share buttons</p>
        <div className="2xl:container mx-auto flex">
          <div className="content w-2/3 mt-20">
            <div className="slider-wraper mb-6">
              <Slider images={images} />
            </div>
            <div className="main-details-wraper mb-6 mx-10">
              <h2
                className={`text-mainTxt font-heading text-2xl font-medium tracking-wide ${bebas.className}`}
              >
                {data?.address_line},{" "}
                {data?.borough ? data?.borough : data?.city}{" "}
                {data?.postcode?.split(" ")[0]}
              </h2>

              <div className="price-date-wraper flex justify-between items-center">
                <p
                  className={`text-mainTxt font-heading text-2xl font-medium tracking-wide ${bebas.className}`}
                >
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
            <div className="description-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full mb-6 shadow-small">
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
            <div className="features-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full mb-6 shadow-small">
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
                {data?.pet_friendly === "true" && (
                  <li className="flex gap-2 items-center min-w-40">
                    <MdOutlinePets className="text-white h-6 w-6" />
                    <span className="text-white/80">Pet friendly</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="agent-info w-1/3 px-4 sticky top-0 h-screen overflow-y-auto mt-16">
            <div className="team-member-wraper bg-mainBg p-10 rounded-xl mt-4 text-white shadow-small">
              <div className="flex justify-between items-center mb-6">
                <div className="name-surname">
                  <p className="text-white/80 text-xs">Agent</p>
                  <p className="text-xl font-bold tracking-wider">
                    {data?.team_member_name} {data?.team_member_surname}
                  </p>
                </div>
                <div className="avatar w-32 h-32 relative rounded-full overflow-hidden shadow-medium border-2 border-slate-100/50">
                  {memberPhoto?.source_url && (
                    <Image
                      src={
                        memberPhoto?.source_url || "/avatar_placeholder.webp"
                      }
                      alt={memberPhoto?.alt_text || "Avatar placeholder"}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </div>
              <div className="contacts flex flex-col text-center bg-mainBg-dark p-4 rounded-lg gap-3">
                <Link
                  href={`tel:${data?.team_member_phone}`}
                  className="rounded-lg border-2 border-mainBg/80 hover:bg-mainBg/80 text-white py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider"
                >
                  Phone number
                </Link>
                <Link
                  href={`mailto:${data?.team_member_email}`}
                  className="rounded-lg border-2 border-mainBg/80 bg-mainBg/80 hover:bg-mainBg/50 hover:border-mainBg/50 text-white py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider"
                >
                  Email
                </Link>
              </div>
              <div className="company-avatar relative mt-4 flex justify-end items-end">
                <Image
                  src={companyLogo?.source_url}
                  alt={companyLogo?.alt_text || "Logo placeholder"}
                  width={115}
                  height={56}
                  priority
                />
              </div>
            </div>
            <AgentSinglePage
              data={data}
              imagesId={imageId}
              name={data?.team_member_name}
              surname={data?.team_member_surname}
              phone={data?.team_member_phone}
              email={data?.team_member_email}
              agentPhoto={memberPhoto?.source_url}
              agentPhotoAlt={memberPhoto?.alt_text}
              companyPhoto={companyLogo?.source_url}
              companyPhotoAlt={companyLogo?.alt_text}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <p>No data found for {slug}</p>;
  }
}
