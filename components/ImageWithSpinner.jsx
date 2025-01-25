"use client";

import Image from "next/image";
import { useState } from "react";
import SmallSpinner from "./SmallSpinner";

export default function ImageWithSpinner({
  src,
  alt,
  width,
  height,
  sizes,
  fill,
  className,
  priority,
  loading,
  spinnerClassName,
  spinnerWraperClassName,
  fillContainerClassName,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const fillProps = fill ? { fill: true } : {}; // Include fill prop only if it's provided

  return (
    <div
      className={`relative ${
        fillContainerClassName ? fillContainerClassName : ""
      }`}
    >
      {isLoading && (
        <div
          className={`${spinnerWraperClassName ? spinnerWraperClassName : ""}`}
        >
          <SmallSpinner
            className={`${spinnerClassName ? spinnerClassName : ""}`}
          />
        </div>
      )}
      <Image
        src={src || "/image_placeholder.webp"}
        alt={alt || "Image placeholder"}
        className={`${className}`}
        priority={priority}
        loading={loading}
        onLoad={handleImageLoad}
        sizes={sizes || undefined}
        {...(fill ? { fill: true } : { width, height })}
        {...fillProps}
      />
    </div>
  );
}
