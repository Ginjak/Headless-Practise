import axios from "axios";

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const username = process.env.WORDPRESS_USERNAME;
const password = process.env.WORDPRESS_PASSWORD;

const auth = Buffer.from(`${username}:${password}`).toString("base64");

const axiosInstance = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: {
    Authorization: `Basic ${auth}`,
  },
});
export const fetchPosts = async (slug) => {
  try {
    const response = await axiosInstance.get(`/${slug}`);

    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchPostsByCategory = async (cpt, category) => {
  try {
    const response = await axiosInstance.get(`${cpt}?category=${category}`);

    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchPostById = async (slug, postId) => {
  try {
    const response = await axiosInstance.get(`/${slug}/${postId}`);

    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchPost = async (slug) => {
  try {
    const response = await axiosInstance.get(`/posts?slug=${slug}&_embed`);
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
export const fetchCptNames = async () => {
  try {
    const response = await axiosInstance.get(`/types`);
    const data = response.data;

    const slugs = Object.values(data)
      .filter(
        (cpt) =>
          cpt.description === "Custom CPT" && cpt.slug !== "website-settings"
      )
      .map((cpt) => cpt.slug);

    return slugs;
  } catch (error) {
    console.error("Error fetching CPT names:", error);
    return [];
  }
};

export const fetchCptPost = async (slug, postSlug) => {
  try {
    const response = await axiosInstance.get(`/${slug}`);
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
    const response = await axiosInstance.get("/pages");
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

export async function generateStaticParams() {
  try {
    const response = await axiosInstance.get("/pages");
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
    const response = await axiosInstance.get("/settings");
    return response.data.page_on_front;
  } catch (error) {
    console.error("Error fetching front page ID:", error);
    return null;
  }
};

// Fetch the page data by slug
export const fetchPageData = async (slug) => {
  try {
    const response = await axiosInstance.get(`/pages?slug=${slug}`);
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

    const response = await axiosInstance.get(`/pages/${pageId}`);
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
      const response = await axiosInstance.get("/pages", {
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
    const response = await axiosInstance.get(`/menu-items`);

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

// export const fetchCustomPostTypePosts = async (slug) => {
//   try {
//     const response = await axiosInstance.get(`/${slug}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// };
