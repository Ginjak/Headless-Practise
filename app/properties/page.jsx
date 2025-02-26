import FilterTest from "@/components/FilterTest";
import PropertyCard from "@/components/propertiesPage/PropertyCard";
import { fetchCities, fetchImageDataById, fetchProperties } from "@/lib/api";
import React, { Suspense } from "react";

// Haversine formula to calculate the distance between two lat/lng points
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of Earth in miles (use 6371 for km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default async function page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  // Destructure searchParams
  const {
    city,
    listing_type,
    radius = 1, // Default radius to 1 mile if not provided
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

  // Handle multiple feature types
  const featureArray = [].concat(resolvedSearchParams["features[]"] || []);
  if (
    resolvedSearchParams.features &&
    !featureArray.includes(resolvedSearchParams.features)
  ) {
    featureArray.push(resolvedSearchParams.features);
  }

  // Handle multiple property types
  let propertyTypeArray = [].concat(
    resolvedSearchParams["property_type[]"] || []
  );
  if (
    resolvedSearchParams.property_type &&
    !propertyTypeArray.includes(resolvedSearchParams.property_type)
  ) {
    propertyTypeArray.push(resolvedSearchParams.property_type);
  }
  propertyTypeArray = propertyTypeArray.filter(
    (type) => type !== "all_properties"
  );

  // Handle multiple key features
  let keyFeaturesArray = [].concat(
    resolvedSearchParams["key_features[]"] || []
  );
  if (
    resolvedSearchParams.key_features &&
    !keyFeaturesArray.includes(resolvedSearchParams.key_features)
  ) {
    keyFeaturesArray.push(resolvedSearchParams.key_features);
  }
  keyFeaturesArray = keyFeaturesArray.filter((type) => type !== "all_features");

  // Construct the filters object
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

  // Fetch properties and cities
  const propertieData = await fetchProperties(filters);
  console.log("Fetched properties with filters:", propertieData);

  const citiesList = await fetchCities();
  console.log("Raw citiesList object:", citiesList);

  // Convert `citiesList` object into an array
  const citiesArray = Object.entries(citiesList).map(([name, coords]) => ({
    name,
    lat: parseFloat(coords.latitude),
    lng: parseFloat(coords.longitude),
  }));

  console.log("Converted citiesArray:", citiesArray);

  // Find the selected city's lat/lng
  const selectedCity = citiesArray.find(
    (c) => c.name.toLowerCase() === city?.toLowerCase()
  );

  if (!selectedCity) {
    console.warn("City not found in citiesList:", city);
  } else {
    console.log("Selected city:", selectedCity);
  }

  // Process properties with images
  const propertiesWithImages = await Promise.allSettled(
    propertieData.posts.map(async (property) => {
      try {
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

  // Extract only successfully processed properties
  const successfulProperties = propertiesWithImages
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  // Apply location-based filtering if a city is selected
  const filteredProperties =
    selectedCity && radius
      ? successfulProperties.filter((property) => {
          if (!property.latitude || !property.longitude) return false;
          const distance = getDistance(
            selectedCity.lat,
            selectedCity.lng,
            property.latitude,
            property.longitude
          );
          return distance <= radius;
        })
      : successfulProperties;

  console.log("Filtered properties:", filteredProperties);

  return (
    <div>
      Test page
      <div className="max-w-7xl mx-auto px-3 flex">
        <div className="w-full lg:w-2/3 mt-4">
          <Suspense fallback={<p>Loading feed...</p>}>
            <div className="grid xs:grid-cols-2 tab:grid-cols-3 gap-4">
              {filteredProperties.map((property) => (
                <div key={property.ID}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </Suspense>
        </div>
        <div className="hidden md:block w-1/3 ps-4 sticky top-0 h-screen overflow-y-auto mt-0">
          <FilterTest citiesList={citiesArray} />
        </div>
      </div>
    </div>
  );
}
