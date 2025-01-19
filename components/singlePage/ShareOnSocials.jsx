"use client";
import { capitalize } from "@/lib/functions";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ShareOnSocials({ postData }) {
  const {
    bedrooms,
    listing_type: type,
    property_type: property,
    address_line: address,
    borough,
    city,
    postcode,
    original_price: price,
    team_member_name: name,
    team_member_surname: surname,
  } = postData;

  const currentPath = usePathname();
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${currentPath}`;

  const subject = `Check out this ${bedrooms} bedroom ${capitalize(
    property
  )} for ${type} on Properties.com`;

  const body = `Check out this ${bedrooms} bedroom ${capitalize(
    property
  )} for ${type} in ${address}, ${borough}, ${city}, ${
    postcode.split(" ")[0]
  } for £${new Intl.NumberFormat().format(
    price
  )}. Marketed by ${name} ${surname} on Properties.com\n${pageUrl}`;

  // Email share link
  const emailLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Facebook share link
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl
  )}`;

  // WhatsApp share link
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    body
  )}`;

  // X (Twitter) share link
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    body
  )}&url=${encodeURIComponent(pageUrl)}`;

  // LinkedIn share link
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pageUrl
  )}`;

  // Function to copy the page URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast.success("Link Copied");
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-3 items-start">
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#09BC8A",
            },
          },
        }}
      />
      {/* Email share button */}
      <button
        onClick={() => (window.location.href = emailLink)}
        className="px-4 py-2 text-property-txt-700"
      >
        Email
      </button>

      {/* Facebook share button */}
      <button
        onClick={() => window.open(facebookLink, "_blank")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
      >
        Share on Facebook
      </button>

      {/* WhatsApp share button */}
      <button
        onClick={() => window.open(whatsappLink, "_blank")}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 "
      >
        Share on WhatsApp
      </button>

      {/* X (Twitter) share button */}
      <button
        onClick={() => window.open(twitterLink, "_blank")}
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 "
      >
        Share on X (Twitter)
      </button>

      <button
        onClick={() => window.open(linkedinLink, "_blank")}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 "
      >
        Share on LinkedIn
      </button>

      {/* Copy link button */}
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Copy Link
      </button>
    </div>
  );
}
