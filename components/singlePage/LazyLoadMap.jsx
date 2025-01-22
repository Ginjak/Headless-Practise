"use client";
import dynamic from "next/dynamic";
import SmallSpinner from "../SmallSpinner";

// Dynamically import the Map component
const LazyLoadedMap = dynamic(() => import("./SinglePostMap"), {
  ssr: false, // Ensures it only loads on the client side
  loading: () => (
    <div className="h-72 md:h-96 w-full rounded-xl mb-6 relative">
      <SmallSpinner className="rounded-xl" />
    </div>
  ),
});

export default LazyLoadedMap;
