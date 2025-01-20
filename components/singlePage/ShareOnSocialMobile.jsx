"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiShare2 } from "react-icons/fi";

export default function ShareonSocialMobile({ data, btnClass, btnText }) {
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
  } = data;

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
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Share button */}
      <button
        onClick={handleShare}
        className={`text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-200 transition-colors ${btnClass}`}
      >
        <FiShare2 /> {btnText}
      </button>
    </div>
  );
}
