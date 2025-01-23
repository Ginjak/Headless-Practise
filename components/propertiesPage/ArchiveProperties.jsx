"use client";
import { useFilterContext } from "@/context/FilterContext";
import { fetchCptPostsWithFilters, fetchPropertiesApi } from "@/lib/api";
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
    queryFn: () => fetchCptPostsWithFilters(filters),
    // Refetch on filter change
    keepPreviousData: true,
  });

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
    <div>
      <div>----------------------------</div>
      <h2>Archive Properties</h2>
      {properties.posts && properties.posts.length > 0 ? (
        properties.posts.map((property) => (
          <Property property={property} key={property.ID} />
        ))
      ) : (
        // Add Component to show if no data available
        <p>No properties available.</p>
      )}
      {/* <Property properties={properties} /> */}
      <Pagination count={properties?.total_posts} cpt={"properties"} />
      {/* Display properties in a formatted way */}
    </div>
  );
}
