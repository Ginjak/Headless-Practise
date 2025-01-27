"use client";
import { useFilterContext } from "@/context/FilterContext";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterTest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useFilterContext();
  const [isMounted, setIsMounted] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });

  // Parse query parameters into an object
  const parseQueryParams = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    const queryFilters = {};

    params.forEach((value, key) => {
      if (key.endsWith("[]")) {
        const arrayKey = key.slice(0, -2);
        queryFilters[arrayKey] = queryFilters[arrayKey] || [];
        queryFilters[arrayKey].push(value);
      } else {
        queryFilters[key] = value;
      }
    });

    return queryFilters;
  };

  // Sync URL filters with context and form
  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted
    const urlFilters = parseQueryParams();
    setFilters(urlFilters); // Update context
    reset(urlFilters); // Reset form to match URL filters
  }, [searchParams, setFilters, reset]);

  const onSubmit = (data) => {
    setFilters(data); // Update context with form data

    // Generate query parameters for the URL
    const queryParams = Object.entries(data)
      .filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0; // Keep non-empty arrays
        if (typeof value === "boolean") return true; // Include booleans
        return value !== "" && value !== undefined && value !== null; // Exclude empty values
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map((val) => `${key}[]=${encodeURIComponent(val)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");

    // Update the URL with filtered query parameters
    router.push(`/properties?${queryParams}`);
  };

  const handleReset = () => {
    const defaultFilters = {
      city: "",
      radius: 5,
      features: [],
      bedrooms_from: 1,
      bedrooms_to: 10,
      pet_friendly: false,
      page: 1,
      per_page: 4,
    };

    reset(defaultFilters); // Reset form
    setFilters(defaultFilters); // Reset context
    router.push("/properties"); // Clear query parameters from URL
  };

  if (!isMounted) return null; // Avoid rendering until the component is mounted

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="filter-form d-flex w-72">
      {/* City */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-property-txt-700"
        >
          Enter a location
        </label>
        <input
          id="city"
          type="text"
          {...register("city")}
          placeholder="Enter city"
          className="bg-property-bg-200 border px-2 py-1 border-property-txt-700/10 text-property-txt-700 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
        />
      </div>

      {/* Radius */}
      <div>
        <label
          htmlFor="radius"
          className="block text-sm font-medium text-property-txt-700"
        >
          Radius
        </label>
        <select
          id="radius"
          {...register("radius")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="1">+1 mile</option>
          <option value="5">+5 miles</option>
          <option value="10">+10 miles</option>
          <option value="20">+20 miles</option>
        </select>
      </div>

      {/* Features */}
      <div>
        <label>Features</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="bungalow"
              {...register("features")}
              className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
            />
            Bungalow
          </label>
          <label>
            <input
              type="checkbox"
              value="garage"
              {...register("features")}
              className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
            />
            Garage
          </label>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label htmlFor="bedrooms_from">Bedrooms (from)</label>
        <input
          id="bedrooms_from"
          type="number"
          {...register("bedrooms_from", { min: 1 })}
          placeholder="From"
        />
        <label htmlFor="bedrooms_to">Bedrooms (to)</label>
        <input
          id="bedrooms_to"
          type="number"
          {...register("bedrooms_to", { min: 1 })}
          placeholder="To"
        />
      </div>

      {/* Pet Friendly */}
      <div>
        <label>Pet Friendly</label>
        <input
          type="checkbox"
          {...register("pet_friendly")}
          defaultChecked={filters.pet_friendly}
          className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
        />
      </div>

      <div>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </form>
  );
}
