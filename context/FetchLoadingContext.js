"use client";
import { createContext, useContext, useState } from "react";

// Create context
const FetchLoadingContext = createContext();

// Custom hook to use FetchLoadingContext
export const useFetchLoading = () => {
  return useContext(FetchLoadingContext);
};

// Provider component to wrap your app and provide the loading state
export const FetchLoadingProvider = ({ children }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  return (
    <FetchLoadingContext.Provider value={{ fetchLoading, setFetchLoading }}>
      {children}
    </FetchLoadingContext.Provider>
  );
};
