import { NextResponse } from "next/server"; // Import NextResponse

const wordpressApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_CPT_URL;
const wordpressUsername = process.env.WORDPRESS_USERNAME;
const wordpressPassword = process.env.WORDPRESS_PASSWORD;

export async function GET(req) {
  // Get query parameters (filters) from the request
  const { searchParams } = new URL(req.url);
  const filters = {}; // Initialize an empty object to hold the filters

  // Iterate over each query parameter in the searchParams
  searchParams.forEach((value, key) => {
    if (filters[key]) {
      // If the key already exists in the filters object, push the new value into the array
      filters[key] = Array.isArray(filters[key])
        ? [...filters[key], value]
        : [filters[key], value];
    } else {
      // If the key doesn't exist, set it as a value (can be a string or array for the first value)
      filters[key] = value;
    }
  });

  // Log the filters to inspect them
  console.log("Filters received:", filters);

  // Construct the URLSearchParams object for the API request
  const urlParams = new URLSearchParams();

  // Iterate over the filters to add them to the URLSearchParams
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle array filters (e.g., features[])
      value.forEach((val) => {
        urlParams.append(key, val);
      });
    } else {
      urlParams.append(key, value);
    }
  });

  // Construct the API URL with query parameters
  const url = `${wordpressApiUrl}/properties?${urlParams.toString()}`;

  // Log the full endpoint URL to see the structure of the request
  console.log("Requesting URL:", url);

  try {
    // Fetch posts from WordPress API with the provided filters
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${wordpressUsername}:${wordpressPassword}`
        ).toString("base64")}`,
      },
    });

    // Log the status code of the response
    console.log("Response status:", response.status);

    // Check if the response is OK
    if (!response.ok) {
      console.log("Response not OK:", response.status);
      return NextResponse.json(
        { error: "Network response was not ok" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the data received from WordPress API
    console.log("Data received from WordPress API:", data);

    // Return the response data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.log("Error fetching data:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
