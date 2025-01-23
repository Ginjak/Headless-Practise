import { NextResponse } from "next/server";

// Hardcoded credentials
const wordpressApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const wordpressUsername = process.env.WORDPRESS_USERNAME;
const wordpressPassword = process.env.WORDPRESS_PASSWORD;

// Define the password required for API access
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;

export async function GET(req) {
  const passwordHeader = req.headers.get("password");
  const referer = req.headers.get("referer");

  // Debug log
  console.log("Password header:", passwordHeader);
  console.log("Expected password:", apiPassword);

  // Check if the password header matches the required API password
  if (passwordHeader !== apiPassword) {
    return NextResponse.json(
      { error: "Unauthorized access. Invalid password." },
      { status: 401 }
    );
  }

  // Log the referer for debugging
  console.log("Referer:", referer);

  // Replace with your frontend's base URL
  const allowedBaseUrl = process.env.NEXT_PUBLIC_BASE_URL; // hardcoded for local testing

  // Allow requests without referer (e.g., Axios), or with valid referer
  if (referer && !referer.startsWith(allowedBaseUrl)) {
    return NextResponse.json(
      { error: "Direct access to this route is not allowed" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("imageId");

  if (!imageId) {
    return NextResponse.json(
      { error: "Image ID is required" },
      { status: 400 }
    );
  }

  // Log imageId for debugging
  console.log("Image ID:", imageId);

  const url = `${wordpressApiUrl}/media/${imageId}`;

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
        { error: "Failed to fetch image from WordPress API" },
        { status: 500 }
      );
    }

    const imageData = await response.json();
    return NextResponse.json(imageData, { status: 200 });
  } catch (error) {
    console.log("Error fetching image:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
