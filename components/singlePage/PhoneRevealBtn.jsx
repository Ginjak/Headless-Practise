"use client";
import Link from "next/link";
import { useState } from "react";

export default function PhoneRevealBtn({ text, phone }) {
  const [buttonText, setButtonText] = useState(text);
  const [href, setHref] = useState(""); // Start with an empty string for href
  const [loading, setLoading] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);

  const handleClick = (event) => {
    if (!clickedOnce) {
      event.preventDefault(); // Prevent navigation for the first click
      setLoading(true);
      setTimeout(() => {
        setButtonText(phone);
        setHref(`tel:${phone}`); // Set href to phone number
        setLoading(false);
        setClickedOnce(true);
      }, 500); // Simulate loading for 500ms
    }
  };

  return (
    <Link
      href={href || ""} // Use empty string as a valid initial value
      onClick={handleClick}
      className="w-full rounded-lg bg-property-bg-100 hover:bg-property-bg-100/80 lg:bg-property-sec-300/20 lg:hover:bg-property-sec-300/50 lg:hover:text-property-bg-100 lg:text-property-txt-700/80 lg:py-3  py-2 lg:px-4 uppercase font-bold tracking-wider transition-all duration-200 flex justify-center text-sm lg:text-base"
    >
      {loading ? (
        <div className="w-6 h-6 border-4 border-t-4 border-property-txt-700/80 border-t-transparent rounded-full animate-spin "></div>
      ) : (
        buttonText
      )}
    </Link>
  );
}
