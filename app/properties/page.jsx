import FilterTest from "@/components/FilterTest";

import PropertyCard from "@/components/propertiesPage/PropertyCard";

import { fetchImageDataById, fetchProperties } from "@/lib/api";

import React, { Suspense } from "react";

// This will be a page that waits for `searchParams` to resolve correctly
export default async function page({ searchParams }) {
  // Await the searchParams object to resolve, if necessary
  const resolvedSearchParams = await searchParams; // Ensure we await the promise

  // Destructure the awaited searchParams object
  const {
    city,
    radius,
    bedrooms_from,
    bedrooms_to,
    bathrooms_from,
    bathrooms_to,
    receptions_from,
    receptions_to,
    page,
    per_page,
    pet_friendly,
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
    city,
    radius,
    bedrooms_from,
    bedrooms_to,
    bathrooms_from,
    bathrooms_to,
    receptions_from,
    receptions_to,
    features: featureArray,
    page,
    per_page,
    pet_friendly,
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
      <div className="max-w-7xl mx-auto px-3 flex">
        <div className="w-full lg:w-2/3 mt-4">
          <Suspense fallback={<p>Loading feed...</p>}>
            <div className="grid xs:grid-cols-2 tab:grid-cols-3 gap-4">
              {successfulProperties.map((property) => {
                return (
                  <div key={property.ID}>
                    <PropertyCard property={property} />
                  </div>
                );
              })}
            </div>
          </Suspense>
        </div>
        <div className=" hidden md:block w-1/3 ps-4 sticky top-0 h-screen overflow-y-auto mt-0">
          <FilterTest />
        </div>
      </div>
    </div>
  );
}
