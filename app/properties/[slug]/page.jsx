import { fetchCptSinglePost, fetchImageData } from "@/lib/api";
import { IoIosBed } from "react-icons/io";
import { TbBathFilled } from "react-icons/tb";
import { PiArmchairFill } from "react-icons/pi";
import { RiCustomSize } from "react-icons/ri";
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
            <div className="slider-wraper">
              <Slider images={images} />
            </div>

            <div className="description-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full">
              <h5 className="font-heading font-bold pb-5 text-2xl tracking-wide">
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
            <div className="features-wraper p-10 rounded-xl bg-mainBg-ligth text-mainTxt w-full"></div>
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
