"use client";
import { createContext, useContext, useState } from "react";

// Create context
const FilterContext = createContext();

// Custom hook to use FilterContext
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// Provider component to wrap your app and provide the filter state
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    city: "",
    listing_type: "sale",
    radius: 5,
    bedrooms_from: "none",
    bedrooms_to: "none",
    bathrooms_from: "none",
    bathrooms_to: "none",
    receptions_from: "none",
    receptions_to: "none",
    price_from: "",
    price_to: "",
    features: ["all_extra_features"],
    property_type: ["all_properties"],
    key_features: ["all_key_features"],
    pet_friendly: false,
    page: 1,
    per_page: 4,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
