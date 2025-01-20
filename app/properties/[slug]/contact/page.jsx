import { fetchCptSinglePost, fetchImageData } from "@/lib/api";

export default async function page({ params }) {
  const { slug } = await params;

  // Fetch single property data
  const data = await fetchCptSinglePost("properties", slug);
  const featuredImage = await fetchImageData([data.featured_image]);
  console.log("Image", featuredImage);
  // If no data is found, return a fallback page
  if (!data) {
    // Change this to 404 component
    return <p>No data found for this property.</p>;
  }
  return (
    <div>
      <p>Contact page</p>
    </div>
  );
}
