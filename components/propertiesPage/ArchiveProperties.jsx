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
        <h2>Archive Properties</h2>
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
