"use client";
import Link from "next/link";
import { BsEnvelopeAt } from "react-icons/bs";
import { usePathname } from "next/navigation"; // Correct hook for pathname

export default function SinglePostContactFormBtn() {
  const pathname = usePathname(); // Get current pathname

  // Construct the URL for the /contact page
  const contactUrl = `${pathname}/contact`;

  return (
    <Link
      href={contactUrl} // Use the constructed contact URL
      className="w-full rounded-lg bg-property-bg-100 text-property-txt-700 hover:bg-property-bg-100/80 lg:bg-property-acc-100 lg:hover:bg-property-acc-300 lg:text-property-bg-100 py-2 lg:py-3 lg:px-4 transition-all duration-200 uppercase font-bold tracking-wider flex items-center justify-center gap-2 text-sm lg:text-base"
    >
      <BsEnvelopeAt className="text-property-txt-700 lg:text-property-bg-100  lg:text-2xl font-bold" />
      Email
    </Link>
  );
}
