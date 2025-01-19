"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ShareButton({ postData }) {
  const [isMobile, setIsMobile] = useState(false);

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

  const shareTitle = `Check out this ${bedrooms} bedroom ${property} for ${type}`;
  const shareText = `Check out this ${bedrooms} bedroom ${property} for ${type} in ${address}, ${borough}, ${city}, ${
    postcode.split(" ")[0]
  } for £${new Intl.NumberFormat().format(
    price
  )}. Marketed by ${name} ${surname} on Properties.com.`;

  // Detect if user is on mobile
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent));
  }, []);

  const handleShare = async () => {
    if (isMobile && navigator.share) {
      // Use Web Share API on mobile devices
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: pageUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for desktop: Open a new window with share links
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          pageUrl
        )}`,
        "_blank"
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(pageUrl)}`,
        "_blank"
      );
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          pageUrl
        )}`,
        "_blank"
      );
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
        "_blank"
      );
    }
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
      {/* Share button */}
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Share this Property
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
