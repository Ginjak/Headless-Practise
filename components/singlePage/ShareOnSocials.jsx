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

  // Deep linking schemes
  const links = {
    facebook: `fb://facewebmodal/f?href=${encodeURIComponent(pageUrl)}`, // Fallback link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    linkedin: `linkedin://shareArticle?mini=true&url=${encodeURIComponent(
      pageUrl
    )}`, // Fallback link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
    whatsapp: `whatsapp://send?text=${encodeURIComponent(body)}`, // Fallback link: `https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`
    twitter: `twitter://post?message=${encodeURIComponent(body)}`, // Fallback link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`
  };

  const fallbackLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      pageUrl
    )}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      body
    )}&url=${encodeURIComponent(pageUrl)}`,
  };

  // Attempt to open app or fallback to web
  const openLink = (appLink, fallbackLink) => {
    const timeout = setTimeout(() => {
      window.open(fallbackLink, "_blank"); // Open fallback link if app isn't installed
    }, 500);

    window.location.href = appLink; // Attempt to open app link

    // Clear timeout if the app opens
    window.addEventListener("blur", () => clearTimeout(timeout), {
      once: true,
    });
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast.success("Link Copied");
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#09BC8A",
            },
          },
        }}
      />

      {/* Facebook share button */}
      <button
        onClick={() => openLink(links.facebook, fallbackLinks.facebook)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Share on Facebook
      </button>

      {/* WhatsApp share button */}
      <button
        onClick={() => openLink(links.whatsapp, fallbackLinks.whatsapp)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Share on WhatsApp
      </button>

      {/* Twitter share button */}
      <button
        onClick={() => openLink(links.twitter, fallbackLinks.twitter)}
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
      >
        Share on Twitter
      </button>

      {/* LinkedIn share button */}
      <button
        onClick={() => openLink(links.linkedin, fallbackLinks.linkedin)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
