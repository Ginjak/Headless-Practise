"use client";
import { useFilterContext } from "@/context/FilterContext";
import {
  fetchCptPostsWithFilters,
  fetchImageById,
  fetchPropertiesApi,
} from "@/lib/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Pagination from "../Pagination";
import Property from "../Property";
import Link from "next/link";

export default function ArchiveProperties() {
  const { filters } = useFilterContext();
  console.log("filters from Archive component", filters);

  // Fetch properties data using react-query
  const {
    data: properties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const response = await fetchCptPostsWithFilters(filters);

      // Fetch images for each property and ensure it won't fail the entire process
      const propertiesWithImages = await Promise.allSettled(
        response.posts.map(async (property) => {
          try {
            const imageUrl = await fetchImageById(property?.featured_image);
            return { ...property, imageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for property ID ${property?.ID}:`,
              error
            );
            return { ...property, imageUrl: "" }; // Default fallback
          }
        })
      );

      // Map the results to extract values from fulfilled promises
      const processedProperties = propertiesWithImages.map((result, index) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error(
            `Image fetch failed for property ID ${response.posts[index]?.ID}`
          );
          return {
            ...response.posts[index],
            imageUrl: "", // Default fallback for rejected promises
          };
        }
      });

      return { ...response, posts: processedProperties };
    },
    keepPreviousData: true, // Ensure smooth transitions
  });

  console.log("First single post in Archive for data", properties?.posts[0]);
  // Log the fetched data, error, and loading states
  useEffect(() => {
    if (isLoading) {
      console.log("Loading properties...");
    } else if (error) {
      console.error("Error fetching properties:", error);
    } else {
      console.log("Fetched properties:", properties);
    }
  }, [isLoading, error, properties]);

  // Render loading state or error message if necessary
  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error fetching properties. Please try again later.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-3 flex">
      <div className="w-full lg:w-2/3 mt-4">
        <h1 className="font-medium pb-3 md:pb-5 text-xl md:text-3xl tracking-wide text-property-txt-700 py-4">
          Archive Properties
        </h1>
        <div className="grid xs:grid-cols-2 tab:grid-cols-3 gap-4">
          {properties.posts && properties.posts.length > 0 ? (
            properties.posts.map((property) => (
              <Property property={property} key={property.ID} />
            ))
          ) : (
            // Add Component to show if no data available
            <p>No properties available.</p>
          )}
        </div>
        {/* <Property properties={properties} /> */}
        <Pagination count={properties?.total_posts} cpt={"properties"} />
        {/* Display properties in a formatted way */}
      </div>
      <div className=" hidden md:block w-1/3 ps-4 sticky top-0 h-screen overflow-y-auto mt-0">
        <p>Filter column</p>
      </div>
    </div>
  );
}
