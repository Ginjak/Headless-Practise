import FilterTest from "@/components/FilterTest";
import ImageWithSpinner from "@/components/ImageWithSpinner";
import SinglePostDivider from "@/components/singlePage/SinglePostDivider";
import {
  fetchCptPostsWithFilters,
  fetchImageById,
  fetchImageDataById,
  fetchProperties,
} from "@/lib/api";
import Link from "next/link";
import React from "react";
import { BsEnvelopeAt } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { IoIosBed } from "react-icons/io";
import { RiCustomSize } from "react-icons/ri";
import { TbBathFilled } from "react-icons/tb";

// This will be a page that waits for `searchParams` to resolve correctly
export default async function page({ searchParams }) {
  // Await the searchParams object to resolve, if necessary
  const resolvedSearchParams = await searchParams; // Ensure we await the promise

  // Destructure the awaited searchParams object
  const {
    bedrooms_from,
    bedrooms_to,
    city,
    features,
    page,
    per_page,
    pet_friendly,
    radius,
  } = resolvedSearchParams;

  // Manually handle 'features[]' and 'features' parameters
  let featureArray = [];

  // Check if 'features[]' exists in the searchParams and ensure it's an array
  if (resolvedSearchParams["features[]"]) {
    featureArray = [].concat(resolvedSearchParams["features[]"]); // Convert to array
  }

  // Check if 'features' exists and push it to the array if not already present
  if (
    resolvedSearchParams.features &&
    !featureArray.includes(resolvedSearchParams.features)
  ) {
    featureArray.push(resolvedSearchParams.features); // Add if missing
  }

  // Construct the filters object with all parameters, including features as an array
  const filters = {
    bedrooms_from,
    bedrooms_to,
    city,
    features: featureArray, // Features as an array
    page,
    per_page,
    pet_friendly,
    radius,
  };

  const propertieData = await fetchProperties(filters);
  console.log("Fetched properties with filters:", propertieData);

  // Log the filters to see the output
  console.log("Filters object:", filters);

  const propertiesWithImages = await Promise.allSettled(
    propertieData.posts.map(async (property) => {
      try {
        // Assuming each property has a 'featured_image' field or similar that identifies the image
        const imageUrl = await fetchImageDataById(property?.featured_image);
        return { ...property, imageUrl };
      } catch (error) {
        console.error(
          `Error fetching image for property ID ${property?.ID}:`,
          error
        );
        return { ...property, imageUrl: "" }; // Default fallback if image fetch fails
      }
    })
  );

  // Extracting only the successful results from the settled promises
  const successfulProperties = propertiesWithImages
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  // Log the properties with images to see the output
  console.log("Properties with images:", successfulProperties);

  // Log the filters to see the output
  console.log("Filters object:", filters);

  return (
    <div>
      Test page
      <FilterTest />
      {successfulProperties.map((property) => {
        return (
          <Link
            key={property?.ID}
            href={`/${property?.post_type}/${property?.slug}`}
            className="rounded-xl border-[1px] border-property-txt-700/10 shadow-md"
          >
            <div className="flex flex-col h-full">
              <div className="min-h-44 xs:min-h-28 sm:min-h-48 tab:min-h-32 2xl:min-h-40">
                <ImageWithSpinner
                  src={
                    property?.imageUrl?.media_details?.sizes?.medium_large
                      ?.source_url ||
                    property?.guid?.rendered ||
                    "/image_placeholder.webp"
                  }
                  alt={property?.imageUrl?.alt_text || "Image placeholder"}
                  width={365}
                  height={230}
                  spinnerWraperClassName={"min-h-52 h-full"}
                  className={"rounded-t-lg w-full xs:w-auto"}
                  priority={"true"}
                />
              </div>

              <div className="p-4 xs:p-2 sm:p-4 flex flex-col justify-between grow">
                <div>
                  <div className="flex xs:flex-col sm:flex-row justify-between mb-2">
                    <p className="text-property-txt-700 text-lg xs:text-base sm:text-lg font-bold tracking-wide">
                      £
                      {property?.original_price &&
                        new Intl.NumberFormat().format(
                          property?.original_price
                        )}
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
                            new Intl.NumberFormat().format(
                              property?.size_in_sq_ft
                            )}
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
                        {/* <ImageWithSpinner
                          src={
                            agentImg?.media_details?.sizes?.thumbnail
                              ?.source_url ||
                            agentImg?.guid?.rendered ||
                            "/agent_placeholder.webp"
                          }
                          alt={agentImg?.alt_text || "Agent avart image"}
                          width={40}
                          height={40}
                          className={"rounded-full"}
                          spinnerClassName={"bg-transparent"}
                        /> */}

                        <p className="flex flex-col leading-none text-sm text-property-txt-700">
                          {property?.team_member_name}{" "}
                          <span>{property?.team_member_surname}</span>
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-3">
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
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
