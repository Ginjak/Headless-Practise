import { fetchCptPosts } from "@/lib/api";
import { similarPropertiesFetch } from "@/lib/functions";
import { fetchImageData } from "@/lib/api"; // Assuming this is where fetchImageData is defined
import SimilarPropertiesSlider from "./SimilarPropertiesSlider";

// Main component
export default async function SimilarProperties({
  latitudePoint,
  longitudePoint,
  radiusKm = 10000,
  bedrooms = 1,
  bathrooms = 1,
  property_type = ["bungalow"],
}) {
  // Combine locationData and filters into a single object
  const data = {
    locationData: {
      userLat: latitudePoint,
      userLng: longitudePoint,
      radius: radiusKm,
    },
    filters: { bedrooms, bathrooms, property_type },
  };

  try {
    const fetchedData = await fetchCptPosts("properties");
    const filteredProperties = similarPropertiesFetch(fetchedData.posts, data);

    // Fetch image data for the filtered properties
    const imageIds = filteredProperties.map(
      (property) => property.featured_image
    );
    const images = await fetchImageData(imageIds);

    // Enrich filtered properties with image data
    const enrichedProperties = filteredProperties.map((property, index) => ({
      ...property,
      image: images[index], // Match images by index
    }));

    return (
      <div>
        <h1>Properties within {data.locationData.radius / 1000} km</h1>
        <SimilarPropertiesSlider data={enrichedProperties} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return <p>Failed to load properties. Please try again later.</p>;
  }
}
