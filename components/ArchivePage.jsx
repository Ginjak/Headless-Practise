import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFilterContext } from "../context/FilterContext";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Property from "./Property";

// Fetch function to get posts from the API route
const fetchCptPosts = async (filters = {}) => {
  // Filter out any empty or undefined filter values
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== undefined
    )
  );

  // Debug log to check what filters are being passed
  console.log("Filters received:", validFilters);

  // Create query parameters for the API request
  const queryParams = [];

  // Iterate over each filter
  Object.entries(validFilters).forEach(([key, value]) => {
    // Debug log to check if value is an array
    console.log(`${key}:`, value);

    if (Array.isArray(value)) {
      // Manually push each array item for 'features[]' into the query string
      if (key === "features") {
        value.forEach((val) => {
          queryParams.push(`features[]=${encodeURIComponent(val)}`);
        });
      } else {
        // For other array-based filters, handle similarly
        value.forEach((val) => {
          queryParams.push(`${key}[]=${encodeURIComponent(val)}`);
        });
      }
    } else {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  // Construct the final URL with query parameters
  const url = `/api/cptPosts?${queryParams.join("&")}`;
  console.log("Request URL2:", url); // Log to inspect the URL

  // const hardcodedPassword = "123456";

  const { data } = await axios.get(url, {
    headers: {
      password: process.env.NEXT_PUBLIC_API_PASSWORD, // Use the same password as in your API route
    },
  });
  console.log("Fetched post data:", data); // Logs data when fetched
  console.log("Total posts:", data.total_posts);
  return data;
};

export default function ArchivePage() {
  const router = useRouter();
  const currentPage = 1;
  const { filters, setFilters } = useFilterContext();

  // Using React Query to fetch properties with the filters
  const {
    data: properties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchCptPosts(filters),
    // refetch on filter change
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFilterNavigation = ({ cpt }) => {
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

    // Construct the URL
    const newUrl = `/${cpt}?${queryParams}`;
    router.push(newUrl); // Navigate to the new URL with filters
  };

  return (
    <div>
      <Filter cpt="properties" />
      --------------------------------
      <h1>Archive Page</h1>
      <Property properties={properties} />
      <Pagination count={properties?.total_posts} cpt={"properties"} />
    </div>
  );
}
