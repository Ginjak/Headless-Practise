"use client";
import Link from "next/link";
import { useState } from "react";
import SmallSpinner from "../SmallSpinner";

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
      className="rounded-lg border-2 border-mainBg/80 hover:bg-mainBg/80 text-white py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider"
    >
      {loading ? <SmallSpinner /> : buttonText}
    </Link>
  );
}
