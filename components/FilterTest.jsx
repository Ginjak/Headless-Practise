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
  const [bedroomsFrom, setBedroomsFrom] = useState();

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

  const handleBedroomsFromChange = (e) => {
    const value = e.target.value;
    setBedroomsFrom(value);
  };

  const generateOptions = (bedroomsFrom) => {
    const fromValue = parseInt(bedroomsFrom, 10);
    if (isNaN(fromValue) || fromValue >= 10) return []; // No options if input is invalid or too high

    const options = [];
    for (let i = fromValue + 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i === 10 ? "10" : i}>
          {i === 10 ? "10" : i}
        </option>
      );
    }

    return options;
  };

  // Sync URL filters with context and form
  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted
    const urlFilters = parseQueryParams();
    setFilters(urlFilters); // Update context
    reset(urlFilters); // Reset form to match URL filters
    setBedroomsFrom(urlFilters.bedrooms_from);
  }, [searchParams, setFilters, reset]);

  const onSubmit = (data) => {
    setFilters(data); // Update context with form data

    // Generate query parameters for the URL
    const queryParams = Object.entries(data)
      .filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0; // Keep non-empty arrays
        if (typeof value === "boolean") return true; // Include booleans
        return (
          value !== "" &&
          value !== undefined &&
          value !== null &&
          value !== "none" // Exclude "none"
        );
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
      bedrooms_from: "none",
      bedrooms_to: "none",
      bathrooms_from: "none",
      bathrooms_to: "none",
      receptions_from: "none",
      receptions_to: "none",
      features: [],
      pet_friendly: false,
      page: 1,
      per_page: 4,
    };

    reset(defaultFilters); // Reset form
    setFilters(defaultFilters); // Reset context
    // router.push("/properties");
  };

  if (!isMounted) return null; // Avoid rendering until the component is mounted

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="filter-form d-flex w-72 flex flex-col gap-3"
    >
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
          className="bg-property-bg-200 border px-2 py-1 border-property-txt-700/10 placeholder:text-property-txt-700/70 text-property-txt-700 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
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
          className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
        >
          <option value="1">+1 mile</option>
          <option value="5">+5 miles</option>
          <option value="10">+10 miles</option>
          <option value="20">+20 miles</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="grow">
          <label
            htmlFor="bedrooms_from"
            className="block text-sm font-medium text-property-txt-700"
          >
            Min beds
          </label>
          <select
            id="bedrooms_from"
            {...register("bedrooms_from")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
            onChange={handleBedroomsFromChange}
          >
            <option value="none">No min</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10+">10</option>
          </select>
        </div>
        <div className="grow">
          <label
            htmlFor="bedrooms_to"
            className="block text-sm font-medium text-property-txt-700"
          >
            Max beds
          </label>
          <select
            id="bedrooms_to"
            {...register("bedrooms_to")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            {bedroomsFrom !== "none" && generateOptions(bedroomsFrom)}
            {/* <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option> */}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="grow">
          <label
            htmlFor="bathrooms_from"
            className="block text-sm font-medium text-property-txt-700"
          >
            Min baths
          </label>
          <select
            id="bathrooms_from"
            {...register("bathrooms_from")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No min</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10+">10</option>
          </select>
        </div>
        <div className="grow">
          <label
            htmlFor="bathrooms_to"
            className="block text-sm font-medium text-property-txt-700"
          >
            Max baths
          </label>
          <select
            id="bathrooms_to"
            {...register("bathrooms_to")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="grow">
          <label
            htmlFor="receptions_from"
            className="block text-sm font-medium text-property-txt-700"
          >
            Min receptions
          </label>
          <select
            id="receptions_from"
            {...register("receptions_from")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No min</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10+">10</option>
          </select>
        </div>
        <div className="grow">
          <label
            htmlFor="receptions_to"
            className="block text-sm font-medium text-property-txt-700"
          >
            Max receptions
          </label>
          <select
            id="receptions_to"
            {...register("receptions_to")}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
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
