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
    features: [],
    property_type: [],
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
