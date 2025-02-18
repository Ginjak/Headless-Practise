import FilterTest from "@/components/FilterTest";

import PropertyCard from "@/components/propertiesPage/PropertyCard";

import { fetchCities, fetchImageDataById, fetchProperties } from "@/lib/api";

import React, { Suspense } from "react";

// This will be a page that waits for `searchParams` to resolve correctly
export default async function page({ searchParams }) {
  // Await the searchParams object to resolve, if necessary
  const resolvedSearchParams = await searchParams; // Ensure we await the promise

  // Destructure the awaited searchParams object
  const {
    city,
    listing_type,
    radius,
    bedrooms_from,
    bedrooms_to,
    bathrooms_from,
    bathrooms_to,
    receptions_from,
    receptions_to,
    price_from,
    price_to,
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

  let propertyTypeArray = [];
  if (resolvedSearchParams["property_type[]"]) {
    propertyTypeArray = [].concat(resolvedSearchParams["property_type[]"]);
  }
  if (
    resolvedSearchParams.property_type &&
    !propertyTypeArray.includes(resolvedSearchParams.property_type)
  ) {
    propertyTypeArray.push(resolvedSearchParams.property_type);
  }

  // Filter out 'all_properties' from the property_type array
  propertyTypeArray = propertyTypeArray.filter(
    (type) => type !== "all_properties"
  );

  let keyFeaturesArray = [];
  if (resolvedSearchParams["key_features[]"]) {
    keyFeaturesArray = [].concat(resolvedSearchParams["key_features[]"]);
  }
  if (
    resolvedSearchParams.key_features &&
    !keyFeaturesArray.includes(resolvedSearchParams.key_features)
  ) {
    keyFeaturesArray.push(resolvedSearchParams.key_features);
  }

  // Filter out 'all_properties' from the property_type array
  keyFeaturesArray = keyFeaturesArray.filter((type) => type !== "all_features");

  // Construct the filters object with all parameters, including features as an array
  const filters = {
    city,
    listing_type,
    radius,
    bedrooms_from,
    bedrooms_to,
    bathrooms_from,
    bathrooms_to,
    receptions_from,
    receptions_to,
    price_from,
    price_to,
    features: featureArray,
    property_type: propertyTypeArray,
    key_features: keyFeaturesArray,
    page,
    per_page,
    pet_friendly,
  };

  const propertieData = await fetchProperties(filters);
  console.log("Fetched properties with filters:", propertieData);

  const citiesList = await fetchCities();
  console.log("List of cities", citiesList);

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
          <FilterTest citiesList={citiesList} />
        </div>
      </div>
    </div>
  );
}
