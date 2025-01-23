import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { fetchImageById } from "@/lib/api";

export default function Property({ property }) {
  // State to store the fetched image data
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Fetch image data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchImageById(property?.featured_image); // Hardcoded image ID
        setImageData(data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Link href={`/${property?.post_type}/${property?.slug}`}>
      {imageData ? (
        <div>
          <p>{imageData?.title?.rendered}</p>{" "}
          {/* Assuming title is part of the response */}
          <Image
            src={imageData?.source_url || ""}
            alt={imageData?.alt_text || "Image"}
            width={600}
            height={400}
          />
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </Link>
  );
}
