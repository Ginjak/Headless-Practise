"use client";
import { useFilterContext } from "@/context/FilterContext";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  encodeBrackets,
  generateOptions,
  handleMinMaxChange,
} from "@/lib/functions";
import { useFetchLoading } from "@/context/FetchLoadingContext";

export default function FilterTest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useFilterContext();
  const { fetchLoading, setFetchLoading } = useFetchLoading();
  const [isMounted, setIsMounted] = useState(false);
  const [bedroomsFrom, setBedroomsFrom] = useState();
  const [bathroomsFrom, setBathroomsFrom] = useState();
  const [receptionsFrom, setReceptionsFrom] = useState();
  const [urlFetchFilter, setUrlFetchFilter] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([
    "all_properties",
  ]);
  const [mustHaveFeatures, setMustHaveFeatures] = useState(["all_features"]);

  const [changedFormInput, setChangedFormIput] = useState({});

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: filters,
  });

  // const formValues = watch();

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

  const onSubmit = (data) => {
    if (data.bedrooms_from === "none") {
      data.bedrooms_to = "none";
    }
    if (data.bathrooms_from === "none") {
      data.bathrooms_to = "none";
    }
    if (data.receptions_from === "none") {
      data.receptions_to = "none";
    }

    setFilters(data); // Update context with form data
    setFetchLoading(true);
    // Generate query parameters for the URL
    const queryParams = Object.entries(data)
      .filter(([key, value]) => {
        if (
          key === "property_type" &&
          Array.isArray(value) &&
          value.includes("all_properties")
        ) {
          return false; // Exclude property_type if it contains "all_properties"
        }
        if (
          key === "key_features" &&
          Array.isArray(value) &&
          value.includes("all_features")
        ) {
          return false; // Exclude if "all_features" is included in "key_features"
        }
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
    const convertedQueryParams = encodeBrackets(queryParams);
    setUrlFetchFilter(convertedQueryParams);
  };

  const handleReset = () => {
    const defaultFilters = {
      city: "",
      listing_type: "sale",
      radius: 5,
      bedrooms_from: "none",
      bedrooms_to: "none",
      bathrooms_from: "none",
      bathrooms_to: "none",
      receptions_from: "none",
      receptions_to: "none",
      features: [],
      property_type: ["all_properties"],
      key_features: ["all_features"],
      pet_friendly: false,
      page: 1,
      per_page: 4,
    };

    reset(defaultFilters); // Reset form
    setFilters(defaultFilters); // Reset context
    setSelectedProperties(["all_properties"]);
    setIsModified(true);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setChangedFormIput((prevState) => {
      let updatedState = { ...prevState, [name]: value };

      // If bedrooms_from is set to 'none', automatically set bedrooms_to to 'none'
      if (name === "bedrooms_from" && value === "none") {
        updatedState.bedrooms_to = "none";
      }
      if (name === "bathrooms_from" && value === "none") {
        updatedState.bathrooms_to = "none";
      }
      if (name === "receptions_from" && value === "none") {
        updatedState.receptions_to = "none";
      }

      return updatedState;
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setSelectedProperties((prev) => {
      if (value === "all_properties") {
        // Prevent unselecting "all_properties" directly
        return prev.includes("all_properties") ? prev : ["all_properties"];
      }

      let updatedSelection = checked
        ? prev.filter((v) => v !== "all_properties").concat(value)
        : prev.filter((v) => v !== value);

      return updatedSelection.length === 0
        ? ["all_properties"]
        : updatedSelection;
    });
  };

  const handleCheckboxChangeKeyFeature = (event) => {
    const { value, checked } = event.target;

    setMustHaveFeatures((prev) => {
      if (value === "all_features") {
        // Prevent unselecting "all_features" directly
        return prev.includes("all_features") ? prev : ["all_features"];
      }

      let updatedSelections = checked
        ? prev.filter((v) => v !== "all_features").concat(value)
        : prev.filter((v) => v !== value);

      return updatedSelections.length === 0
        ? ["all_features"]
        : updatedSelections;
    });
  };

  useEffect(() => {
    setIsMounted(true);
    const urlFilters = parseQueryParams();
    setFilters(urlFilters);
    reset(urlFilters);
    setBedroomsFrom(urlFilters.bedrooms_from);
    setBathroomsFrom(urlFilters.bathrooms_from);
    setReceptionsFrom(urlFilters.receptions_from);

    // Store the initial form values for later comparison
    setInitialValues(urlFilters);
    setChangedFormIput(urlFilters);
  }, [searchParams, setFilters, reset]);

  // Detect changes between the initial values and current form values
  useEffect(() => {
    if (JSON.stringify(initialValues) === JSON.stringify(changedFormInput)) {
      setIsModified(false);
      console.log("Modified inputs", changedFormInput);
      console.log("Initial values", initialValues);
    } else {
      setIsModified(true);
      console.log("Modified inputs", changedFormInput);
      console.log("Initial values", initialValues);
    }
  }, [changedFormInput]);

  useEffect(() => {
    if (searchParams?.toString() === urlFetchFilter) {
      setFetchLoading(false);
    }
  }, [urlFetchFilter, searchParams]);

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

      <div>
        <label
          htmlFor="listing_type"
          className="block text-sm font-medium text-property-txt-700"
        >
          Buy or Rent
        </label>
        <select
          id="listing_type"
          {...register("listing_type")}
          onChange={onChangeHandler}
          className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
        >
          <option value="sale">For sale</option>
          <option value="rent">To rent</option>
        </select>
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
          onChange={onChangeHandler}
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
            onChange={(e) => {
              handleMinMaxChange(e, setBedroomsFrom);
              onChangeHandler(e);
            }}
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
            htmlFor="bedrooms_to"
            className="block text-sm font-medium text-property-txt-700"
          >
            Max beds
          </label>
          <select
            id="bedrooms_to"
            {...register("bedrooms_to")}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            {bedroomsFrom !== "none" && generateOptions(bedroomsFrom, 10)}
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
            onChange={(e) => {
              handleMinMaxChange(e, setBathroomsFrom, setBathroomsFrom);
              onChangeHandler(e);
            }}
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
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            {bathroomsFrom !== "none" && generateOptions(bathroomsFrom, 10)}
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
            onChange={(e) => {
              handleMinMaxChange(e, setReceptionsFrom);
              onChangeHandler(e);
            }}
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
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className="bg-property-bg-200 border px-2 py-1 border-property-txt-700  text-property-txt-700/70 rounded focus:property-acc-100 focus:border-property-acc-100 block w-full"
          >
            <option value="none">No max</option>
            {receptionsFrom !== "none" && generateOptions(receptionsFrom, 10)}
          </select>
        </div>
      </div>
      <div>
        {/* Must have features */}
        <p className="text-sm font-medium text-property-txt-700 mb-2">
          Must have
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="all_features"
              {...register("key_features")}
              checked={mustHaveFeatures.includes("all_features")}
              disabled={mustHaveFeatures.some((v) => v !== "all_features")}
              onChange={handleCheckboxChangeKeyFeature}
              className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
            />
            Show all
          </label>

          {["garage", "driveway", "off-street", "garden", "balcony"].map(
            (type) => (
              <label key={type} className={`flex items-center gap-2`}>
                <input
                  type="checkbox"
                  {...register("key_features")}
                  value={type}
                  checked={mustHaveFeatures.includes(type)}
                  onChange={handleCheckboxChangeKeyFeature}
                  className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
                />
                {type.charAt(0).toUpperCase() +
                  type.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            )
          )}
        </div>
      </div>

      {/* Property types */}
      <div>
        <p className="text-sm font-medium text-property-txt-700 mb-2">
          Property type
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="all_properties"
              {...register("property_type")}
              checked={selectedProperties.includes("all_properties")}
              disabled={selectedProperties.some((v) => v !== "all_properties")}
              onChange={handleCheckboxChange}
              className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
            />
            Show all
          </label>

          {[
            "bungalow",
            "detached",
            "terraced",
            "flat",
            "apartment",
            "semiDetached",
          ].map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 ${
                type === "semiDetached" ? "col-span-2" : ""
              }`}
            >
              <input
                type="checkbox"
                {...register("property_type")}
                value={type}
                checked={selectedProperties.includes(type)}
                onChange={handleCheckboxChange}
                className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
              />
              {type.charAt(0).toUpperCase() +
                type.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <label>Features</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="fireplace"
              {...register("features")}
              className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
            />
            Fireplace
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
        <button
          type="submit"
          disabled={!isModified}
          className={fetchLoading ? "p-4 bg-red-500" : "p-4 bg-slate-500"}
        >
          {fetchLoading ? "Loading" : "Apply filters"}
        </button>
        <button type="button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </form>
  );
}
