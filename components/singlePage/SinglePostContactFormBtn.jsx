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
      className="rounded-lg bg-property-acc-100 hover:bg-property-acc-300 text-property-bg-100 py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider flex items-center justify-center gap-2"
    >
      <BsEnvelopeAt className="text-property-bg-100 text-2xl font-bold" />
      Email
    </Link>
  );
}
