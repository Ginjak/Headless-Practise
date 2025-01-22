"use client";

import Image from "next/image";
import { useState } from "react";
import SmallSpinner from "./SmallSpinner";

export default function ImageWithSpinner({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  loading,
  spinnerClassName,
  spinnerWraperClassName,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const fillProps = fill ? { fill: true } : {}; // Include fill prop only if it's provided

  return (
    <div className="relative">
      {isLoading && (
        <div className={spinnerWraperClassName}>
          <SmallSpinner className={spinnerClassName} />
        </div>
      )}
      <Image
        src={src || "/image_placeholder.webp"}
        alt={alt || "Image placeholder"}
        width={!fill ? width : undefined} // Only pass width if not using fill
        height={!fill ? height : undefined} // Only pass height if not using fill
        className={className || "rounded-t-xl"} // Apply passed or default className
        priority={priority}
        loading={loading}
        onLoad={handleImageLoad}
        {...fillProps} // Spread the conditional fill prop
      />
    </div>
  );
}
