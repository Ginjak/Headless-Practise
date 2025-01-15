import { useEffect } from "react";
import { useFilterContext } from "@/context/FilterContext";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation"; // Correct hook for App Router

const Filter = ({ cpt }) => {
  const { filters, setFilters } = useFilterContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });
  const searchParams = useSearchParams(); // Get query parameters

  useEffect(() => {
    // Ensure that searchParams are available
    if (searchParams) {
      const queryParams = Object.fromEntries(searchParams.entries());

      // Check if 'features[]' exists as an array
      if (searchParams.has("features[]")) {
        // If 'features[]' exists, convert it into an array of features
        const featuresArray = searchParams.getAll("features[]");

        // Directly set the 'features[]' in queryParams as an array of values
        queryParams["features[]"] = featuresArray; // Set features[] as an array
      } else {
        // Handle the case where 'features[]' doesn't exist, or you can set it as an empty array
        queryParams["features[]"] = [];
      }

      // Parse query params to match form fields
      const parsedFilters = {
        page: queryParams.page || 1,
        per_page: 2, // Define per_page as per your logic
        city: queryParams.city || "",
        features: queryParams["features[]"] || [], // Ensure that features is correctly set
        bedrooms_from: queryParams.bedrooms_from || 1,
        bedrooms_to: queryParams.bedrooms_to || 10,
        pet_friendly: queryParams.pet_friendly === "true" || false, // Handle checkbox for pet_friendly
      };

      setFilters(parsedFilters); // Update context with parsed filters

      // Reset form with parsed filters from the URL
      reset(parsedFilters);
    }
  }, [searchParams, reset, setFilters]); // Triggered when searchParams changes

  // Handle form submission
  const onSubmit = (data) => {
    setFilters(data);
    handleFilterNavigation(data); // Navigate with updated filters
  };

  // Handle filter navigation
  const handleFilterNavigation = (filtersData) => {
    const queryParams = Object.entries(filtersData)
      .filter(
        ([key, value]) =>
          value !== "" &&
          value !== undefined &&
          key !== "per_page" &&
          !(Array.isArray(value) && value.length === 0)
      )
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map((val) => `${key}[]=${encodeURIComponent(val)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");

    const newUrl = `/${cpt}?${queryParams}`;
    window.history.pushState({}, "", newUrl); // Navigate to the new URL with filters
  };

  // Handle reset functionality
  const handleReset = () => {
    // Reset form with initial filters (can pass empty object to reset to default)
    reset({
      city: "",
      features: [],
      bedrooms_from: 1,
      bedrooms_to: 10,
      pet_friendly: false,
    });

    // Reset context filters
    setFilters({
      city: "",
      features: [],
      bedrooms_from: 1,
      bedrooms_to: 10,
      pet_friendly: false,
      page: 1,
      per_page: 4,
    });

    // const resetUrl = `/${cpt}`;
    // window.history.pushState({}, "", resetUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
      {/* City */}
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          {...register("city")}
          placeholder="Enter city"
        />
      </div>

      {/* Features */}
      <div>
        <label>Features</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="bungalow"
              {...register("features")} // Register 'features' as an array
            />
            Bungalow
          </label>
          <label>
            <input type="checkbox" value="garage" {...register("features")} />
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
          defaultChecked={filters.pet_friendly} // Ensure checkbox is checked based on URL param
        />
      </div>

      {/* Submit and Reset buttons */}
      <div>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default Filter;
