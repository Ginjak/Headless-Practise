import { fetchCptPostsForSimilarPropertiesSlider } from "@/lib/api";
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
  const location = {
    userLat: latitudePoint,
    userLng: longitudePoint,
    radius: radiusKm,
  };

  const filterData = {
    cpt: "properties",
    bedroomsFrom: 1,
    bedroomsTo: 2,
    propertyType: ["bungalow", "detached"],
  };

  try {
    const similarPostWithFilters =
      await fetchCptPostsForSimilarPropertiesSlider(filterData);
    const filteredPropertiesByDistance = similarPropertiesFetch(
      similarPostWithFilters.posts,
      location
    );
    // Fetch image data for the filtered properties
    const imageIds = filteredPropertiesByDistance.map(
      (property) => property.featured_image
    );
    const images = await fetchImageData(imageIds);
    // Enrich filtered properties with image data
    const filteredPropertiesByDistanceWithImages =
      filteredPropertiesByDistance.map((property, index) => ({
        ...property,
        image: images[index],
      }));

    return (
      <div>
        <h5 className="font-medium pb-5 text-2xl tracking-wide text-property-txt-700 px-10">
          Similar properties
        </h5>
        <SimilarPropertiesSlider
          data={filteredPropertiesByDistanceWithImages}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return <p>Failed to load properties. Please try again later.</p>;
  }
}
