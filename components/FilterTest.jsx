"use client";
import { useFilterContext } from "@/context/FilterContext";
import { useForm, Controller } from "react-hook-form";
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

  const [changedFormInput, setChangedFormIput] = useState({});

  const { register, handleSubmit, reset, control } = useForm({
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
    // If all properties selected it wont get pushed to url
    if (Array.isArray(data.property_type)) {
      if (
        data.property_type.length === 1 &&
        data.property_type.includes("all_properties")
      ) {
        data.property_type = [];
      } else {
        data.property_type = data.property_type.filter(
          (type) => type !== "all_properties"
        );
      }
    } else if (data.property_type === "all_properties") {
      data.property_type = "";
    }
    // If all key features selected it wont get pushed to url
    if (Array.isArray(data.key_features)) {
      if (
        data.key_features.length === 1 &&
        data.key_features.includes("all_key_features")
      ) {
        data.key_features = [];
      } else {
        data.key_features = data.key_features.filter(
          (type) => type !== "all_key_features"
        );
      }
    } else if (data.key_features === "all_key_features") {
      data.key_features = "";
    }
    // If all extra features selected it wont get pushed to url
    if (Array.isArray(data.features)) {
      if (
        data.features.length === 1 &&
        data.features.includes("all_extra_features")
      ) {
        data.features = [];
      } else {
        data.features = data.features.filter(
          (type) => type !== "all_extra_features"
        );
      }
    } else if (data.features === "all_extra_features") {
      data.features = "";
    }

    setFilters(data); // Update context with form data
    setFetchLoading(true);
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
      features: ["all_extra_features"],
      property_type: ["all_properties"],
      key_features: ["all_key_features"],
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

  useEffect(() => {
    setIsMounted(true);
    const urlFilters = parseQueryParams();

    if (!urlFilters.property_type) {
      urlFilters.property_type = ["all_properties"];
    }

    if (!urlFilters.key_features) {
      urlFilters.key_features = ["all_key_features"];
    }

    if (!urlFilters.features) {
      urlFilters.features = ["all_extra_features"];
    }

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

  // useEffect checks if compared url are matching and if so set loading to false
  useEffect(() => {
    if (searchParams?.toString() === urlFetchFilter) {
      setFetchLoading(false);
    }
  }, [urlFetchFilter, searchParams]);

  // Property types
  const propertyTypes = [
    { value: "all_properties", label: "Show all" },
    { value: "bungalow", label: "Bungalow" },
    { value: "terraced", label: "Terraced" },
    { value: "flat", label: "Flat" },
    { value: "apartment", label: "Apartment" },
    { value: "detached", label: "Detached" },
    { value: "semi-detached", label: "Semi-detached" },
  ];

  // Key feature types
  const keyFeatures = [
    { value: "all_key_features", label: "Show all" },
    { value: "garage", label: "Garage" },
    { value: "driveway", label: "Driveway" },
    { value: "garden", label: "Garden" },
    { value: "balcony", label: "Balcony" },
    { value: "off-street", label: "Off-street parking" },
  ];

  // Extra feature types
  const extraFeatures = [
    { value: "all_extra_features", label: "Show all" },
    { value: "patio", label: "Patio" },
    { value: "swimming-pool", label: "Swimming pool" },
    { value: "jacuzzi", label: "Jacuzzi" },
    { value: "tennis-court", label: "Tennis court" },
    { value: "cinema-room", label: "Cinema room" },
    { value: "fireplace", label: "Fireplace" },
    { value: "basement", label: "Basement" },
    { value: "alarm-system", label: "Alarm system" },
    { value: "cctv", label: "CCTV" },
    { value: "kitchen-island", label: "Kitchen island" },
    { value: "bathtub", label: "Bathtub" },
    { value: "utility-room", label: "Utility room" },
    { value: "conservatory", label: "Conservatory" },
  ];

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
      {/* Bedrooms */}
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
      {/* Bathrooms */}
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
      {/* Receptions */}
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

      {/* Property types */}
      <div>
        <p className="text-sm font-medium text-property-txt-700 mb-2">
          Property type
        </p>
        <Controller
          name="property_type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map(({ value, label }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={value}
                    checked={field.value?.includes(value)}
                    onChange={(e) => {
                      let newValue;

                      if (value === "all_properties") {
                        // If "all_properties" is checked, uncheck all others
                        newValue = e.target.checked ? ["all_properties"] : [];
                      } else {
                        // If any other option is checked, update the array
                        newValue = e.target.checked
                          ? [...field.value, value]
                          : field.value.filter((val) => val !== value);

                        // If "all_properties" is in the array and any other is selected, remove "all_properties"
                        if (
                          newValue.includes("all_properties") &&
                          e.target.checked
                        ) {
                          newValue = newValue.filter(
                            (val) => val !== "all_properties"
                          );
                        }
                      }

                      // Handle the change in form input and filters state
                      setChangedFormIput((prevState) => {
                        return { ...prevState, property_type: newValue };
                      });

                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        property_type: newValue, // Update the property_type in the filters
                      }));

                      field.onChange(newValue); // Also update React Hook Form state
                    }}
                    className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Key features must have */}
      <div>
        <p className="text-sm font-medium text-property-txt-700 mb-2">
          Must have
        </p>
        <Controller
          name="key_features"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {keyFeatures.map(({ value, label }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={value}
                    checked={field.value?.includes(value)}
                    onChange={(e) => {
                      let newValue;

                      if (value === "all_key_features") {
                        // If "all_properties" is checked, uncheck all others
                        newValue = e.target.checked ? ["all_key_features"] : [];
                      } else {
                        newValue = e.target.checked
                          ? [...field.value, value]
                          : field.value.filter((val) => val !== value);

                        if (
                          newValue.includes("all_key_features") &&
                          e.target.checked
                        ) {
                          newValue = newValue.filter(
                            (val) => val !== "all_key_features"
                          );
                        }
                      }

                      // Handle the change in form input and filters state
                      setChangedFormIput((prevState) => {
                        return { ...prevState, key_features: newValue };
                      });

                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        key_features: newValue,
                      }));

                      field.onChange(newValue);
                    }}
                    className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Extra features  */}
      <div>
        <p className="text-sm font-medium text-property-txt-700 mb-2">
          Features
        </p>
        <Controller
          name="features"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {extraFeatures.map(({ value, label }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={value}
                    checked={field.value?.includes(value)}
                    onChange={(e) => {
                      let newValue;

                      if (value === "all_extra_features") {
                        // If "all_properties" is checked, uncheck all others
                        newValue = e.target.checked
                          ? ["all_extra_features"]
                          : [];
                      } else {
                        newValue = e.target.checked
                          ? [...field.value, value]
                          : field.value.filter((val) => val !== value);

                        if (
                          newValue.includes("all_extra_features") &&
                          e.target.checked
                        ) {
                          newValue = newValue.filter(
                            (val) => val !== "all_extra_features"
                          );
                        }
                      }

                      // Handle the change in form input and filters state
                      setChangedFormIput((prevState) => {
                        return { ...prevState, features: newValue };
                      });

                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        features: newValue,
                      }));

                      field.onChange(newValue);
                    }}
                    className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Pet Friendly */}
      {changedFormInput?.listing_type === "rent" && (
        <div>
          <label>Pet Friendly</label>
          <input
            type="checkbox"
            {...register("pet_friendly")}
            defaultChecked={filters.pet_friendly}
            className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
          />
        </div>
      )}

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
