import axios from "axios";

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const username = process.env.WORDPRESS_USERNAME;
const password = process.env.WORDPRESS_PASSWORD;
const WORDPRESS_API_CPT_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_CPT_URL;

const auth = Buffer.from(`${username}:${password}`).toString("base64");

const axiosInstanceMain = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: {
    Authorization: `Basic ${auth}`,
  },
});

const axiosInstanceCpt = axios.create({
  baseURL: WORDPRESS_API_CPT_URL,
  headers: {
    Authorization: `Basic ${auth}`,
  },
});

export const fetchPosts = async (slug) => {
  try {
    const response = await axiosInstanceMain.get(`/${slug}`);

    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchCptSinglePost = async (cptSlug, slug) => {
  try {
    const response = await axiosInstanceCpt.get(`/${cptSlug}/${slug}`);

    return response.data;
  } catch (error) {
    return [];
  }
};
export const fetchCptShortSinglePost = async (cptSlug, slug) => {
  try {
    const response = await axiosInstanceCpt.get(`/${cptSlug}/${slug}`);

    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchImageDataAll = async (ids) => {
  try {
    // Ensure that ids is an array
    if (!Array.isArray(ids)) {
      throw new Error("The argument must be an array of IDs.");
    }

    // Fetch image data for each ID concurrently using Promise.all
    const imageData = await Promise.all(
      ids.map((id) =>
        axiosInstanceMain
          .get(`/media/${id}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error(`Error fetching image with ID ${id}:`, error);
            return null; // Return null for failed requests
          })
      )
    );

    // Filter out null values (failed fetches) but keep valid responses
    return imageData.filter((image) => image !== null);
  } catch (error) {
    console.error("Error fetching image data:", error);
    return []; // Return empty array if something fails globally
  }
};

export const fetchImageById = async (imageId) => {
  const url = `/api/fetchImageById?imageId=${imageId}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        password: process.env.NEXT_PUBLIC_API_PASSWORD,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
};

export const fetchImageDataById = async (id) => {
  try {
    // Ensure that id is provided and it's a valid string or number
    if (!id) {
      throw new Error("ID is required to fetch the image.");
    }

    // Fetch image data for the provided ID
    const response = await axiosInstanceMain.get(`/media/${id}`);

    // Return the image data from the response
    return response.data;
  } catch (error) {
    console.error(`Error fetching image with ID ${id}:`, error);
    return null; // Return null if fetching the image fails
  }
};

export const fetchAllCptPosts = async ({ slug }) => {
  try {
    const url = `/${slug}`;
    const response = await axiosInstanceCpt.get(url);
    console.log("url that is fetched", url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response ? error.response.data : error
    );
    return [];
  }
};

export const fetchProperties = async (filters = {}) => {
  // Filter out empty or undefined values from the filters
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== undefined
    )
  );

  // Construct query parameters for the API request
  const queryParams = [];

  Object.entries(validFilters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle array-based filters (e.g., 'features[]')
      value.forEach((val) => {
        queryParams.push(`${key}[]=${encodeURIComponent(val)}`);
      });
    } else {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  // Construct the full API URL with query parameters
  const url = `/properties?${queryParams.join("&")}`;
  console.log("Full API URL:", url);

  try {
    const response = await axiosInstanceCpt.get(url);
    console.log("URL that is fetched:", url);
    return response.data; // Adjust the response structure if needed
  } catch (error) {
    console.error(
      "Error fetching properties:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const fetchCptPostsWithFilters = async (filters = {}) => {
  // Filter out empty or undefined filter values
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== undefined
    )
  );

  // Construct query parameters for the API request
  const queryParams = [];

  // Iterate over each filter
  Object.entries(validFilters).forEach(([key, value]) => {
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
  console.log("Full API URL:", url);

  try {
    // Fetch data from the API
    const response = await axios.get(url, {
      headers: {
        password: process.env.NEXT_PUBLIC_API_PASSWORD, // Use the same password as in your API route
      },
    });

    console.log("URL that is fetched:", url);
    return response.data; // Adjust the response structure if needed
  } catch (error) {
    console.error(
      "Error fetching properties:",
      error.response ? error.response.data : error
    );
    throw error; // Rethrow the error after logging
  }
};

export const fetchCptPostsForSimilarPropertiesSlider = async ({
  cpt,
  bedroomsFrom,
  bedroomsTo,
  propertyType = [],
}) => {
  try {
    // Build property_type query parameters from the array
    const propertyTypeQuery = propertyType
      .map((type) => `property_type[]=${encodeURIComponent(type)}`)
      .join("&");

    // Construct the full URL
    const url = `/${cpt}?bedrooms_from=${bedroomsFrom}&bedrooms_to=${bedroomsTo}&${propertyTypeQuery}`;

    const response = await axiosInstanceCpt.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response ? error.response.data : error
    );
    return [];
  }
};

export const fetchCptPosts = async (slug, filters = {}) => {
  try {
    const url = `/${slug}?${new URLSearchParams(filters).toString()}`;
    const response = await axiosInstanceCpt.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response ? error.response.data : error
    );
    return [];
  }
};

export const fetchPost = async (slug) => {
  try {
    const response = await axiosInstanceMain.get(`/posts?slug=${slug}&_embed`);
    const post = response.data[0];

    if (post) {
      return post; // This will include custom fields (if they exist)
    }
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const fetchCptPost = async (slug, postSlug) => {
  try {
    const response = await axiosInstanceMain.get(`/${slug}`);
    const data = response.data;

    // Loop through the result data to find the item with the matching slug
    const matchedItem = data.find((item) => item.slug === postSlug);

    // Return the ID if a matching item is found, otherwise return null
    return matchedItem ? matchedItem.id : null;
  } catch (error) {
    console.error("Error fetching CPT post:", error);
    return null;
  }
};

export const fetchPages = async () => {
  try {
    const response = await axiosInstanceMain.get("/pages");
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

export async function generateStaticParams() {
  try {
    const response = await axiosInstanceMain.get("/pages");
    const pages = response.data;

    // Generate static paths based on fetched pages
    const paths = pages.map((page) => ({
      params: { slug: page.slug },
    }));

    // Return the paths to be statically generated
    return paths;
  } catch (error) {
    throw new Error("Failed to fetch pages");
  }
}

export const fetchFrontPageID = async () => {
  try {
    const response = await axiosInstanceMain.get("/settings");
    return response.data.page_on_front;
  } catch (error) {
    console.error("Error fetching front page ID:", error);
    return null;
  }
};

// Fetch the page data by slug
export const fetchPageData = async (slug) => {
  try {
    const response = await axiosInstanceMain.get(`/pages?slug=${slug}`);
    const pageData = response.data;
    return pageData;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return { pageData: [], isHomePage: false };
  }
};

export const pageContentById = async (pageId) => {
  try {
    // Check if pageId is valid
    if (!pageId) {
      console.error("Invalid page ID:", pageId);
      return null;
    }

    const response = await axiosInstanceMain.get(`/pages/${pageId}`);
    if (!response.data) {
      console.error("No data found for page ID:", pageId);
      return null;
    }
    return response.data; // Return the page data
  } catch (error) {
    console.error("Error fetching front page content:", error);
    return null;
  }
};

export const fetchPagesSlugs = async () => {
  try {
    let allSlugs = [];
    let currentPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await axiosInstanceMain.get("/pages", {
        params: { page: currentPage },
      });

      // Add the slugs from the current page to the array
      const slugs = response.data.map((page) => page.slug);
      allSlugs = [...allSlugs, ...slugs];

      // Check if there is a next page (assuming the API returns a 'next' property)
      if (response.data.length < 10) {
        hasMorePages = false; // No more pages to fetch
      } else {
        currentPage++; // Move to the next page
      }
    }

    return allSlugs;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

// Fetch menus and build
export const fetchAndBuildMenuTree = async () => {
  try {
    // Fetch the menu items from the WP REST API V2 Menus plugin
    const response = await axiosInstanceMain.get(`/menu-items`);

    // Check if menus are returned and handle the response accordingly
    if (response.data && Array.isArray(response.data)) {
      const menuItems = response.data;

      // Create a map of menu items by their ID
      const menuMap = {};
      const menuTree = [];

      menuItems.forEach((item) => {
        menuMap[item.id] = { ...item, children: [] };
      });

      // Organize items into the tree structure
      menuItems.forEach((item) => {
        if (item.parent === 0) {
          menuTree.push(menuMap[item.id]);
        } else if (menuMap[item.parent]) {
          menuMap[item.parent].children.push(menuMap[item.id]);
        }
      });

      // Add "has-children" and level classes to items
      const addClasses = (items, level = 1) => {
        items.forEach((item) => {
          // Add the "has-children" class if the item has children
          if (item.children.length > 0) {
            item.class = `has-children level-${level}`;
          } else {
            item.class = `level-${level}`;
          }

          // Recursively add classes for child items
          if (item.children && item.children.length > 0) {
            addClasses(item.children, level + 1);
          }
        });
      };

      addClasses(menuTree); // Apply classes starting from root level

      return menuTree; // Return the menu tree with added classes
    } else {
      console.error("Menus data is not in the expected format:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching menus:", error);
    return null;
  }
};
