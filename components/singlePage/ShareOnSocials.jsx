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

  // App deep links
  const facebookAppLink = `fb://facewebmodal/f?href=${encodeURIComponent(
    pageUrl
  )}`;
  const whatsappAppLink = `whatsapp://send?text=${encodeURIComponent(body)}`;

  // Web links as fallbacks
  const facebookWebLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl
  )}`;
  const whatsappWebLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    body
  )}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    body
  )}&url=${encodeURIComponent(pageUrl)}`;
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pageUrl
  )}`;

  // Function to attempt app link or fallback to web
  const openLink = (appLink, webLink) => {
    const newWindow = window.open(appLink, "_blank");
    setTimeout(() => {
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        window.open(webLink, "_blank");
      }
    }, 1000); // Adjust the timeout if needed
  };

  // Function to copy the page URL to clipboard
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
      {/* Email share button */}
      <button
        onClick={() => (window.location.href = emailLink)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
      >
        Share via Email
      </button>

      {/* Facebook share button */}
      <button
        onClick={() => openLink(facebookAppLink, facebookWebLink)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
      >
        Share on Facebook
      </button>

      {/* WhatsApp share button */}
      <button
        onClick={() => openLink(whatsappAppLink, whatsappWebLink)}
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

      {/* LinkedIn share button */}
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
