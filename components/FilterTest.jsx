"use client";
import { useFilterContext } from "@/context/FilterContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { fetchProperties } from "@/lib/api";

export default function FilterTest() {
  const router = useRouter();
  const { filters, setFilters } = useFilterContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });
  const queryParams = Object.entries(filters)
    .filter(([key, value]) => value !== undefined && key !== "per_page") // Exclude undefined values and 'per_page' filter
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array filters like features[]=
        return value
          .map((val) => `${key}[]=${encodeURIComponent(val)}`)
          .join("&");
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
  console.log("filter data", filters);
  console.log("Query Params", queryParams);
  const onSubmit = (data) => {
    setFilters(data);
    console.log(data);
    router.push(`/properties?${queryParams}`);
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

// Handle form submission
