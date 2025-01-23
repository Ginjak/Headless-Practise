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
    page: 1,
    per_page: 2,
    city: undefined,
    features: [""],
    bedrooms_from: 1,
    bedrooms_to: 10,
    pet_friendly: true,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
