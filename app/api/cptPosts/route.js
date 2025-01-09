import { NextResponse } from "next/server";

const wordpressApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_CPT_URL;
const wordpressUsername = process.env.WORDPRESS_USERNAME;
const wordpressPassword = process.env.WORDPRESS_PASSWORD;

// Define the password required for API access
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;

export async function GET(req) {
  const passwordHeader = req.headers.get("password");
  const referer = req.headers.get("referer");

  // Check if the password header matches the required API password
  if (passwordHeader !== apiPassword) {
    return NextResponse.json(
      { error: "Unauthorized access. Invalid password." },
      { status: 401 }
    );
  }

  // Replace with your frontend's base URL
  const allowedBaseUrl = process.env.NEXT_MAIN_DOMAIN_NAME;

  // Allow requests without referer (e.g., Axios), or with valid referer
  if (referer && !referer.startsWith(allowedBaseUrl)) {
    return NextResponse.json(
      { error: "Direct access to this route is not allowed" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const filters = {};
  searchParams.forEach((value, key) => {
    if (filters[key]) {
      filters[key] = Array.isArray(filters[key])
        ? [...filters[key], value]
        : [filters[key], value];
    } else {
      filters[key] = value;
    }
  });

  const urlParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => urlParams.append(key, val));
    } else {
      urlParams.append(key, value);
    }
  });

  const url = `${wordpressApiUrl}/properties?${urlParams.toString()}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${wordpressUsername}:${wordpressPassword}`
        ).toString("base64")}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from WordPress API" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
