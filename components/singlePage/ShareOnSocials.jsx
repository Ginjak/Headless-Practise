"use client";
import { capitalize } from "@/lib/functions";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { BsEnvelopeAt } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaCopy } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";

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

  const emailLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl
  )}`;

  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    body
  )}`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    body
  )}&url=${encodeURIComponent(pageUrl)}`;

  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pageUrl
  )}`;

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
      <button
        onClick={() => (window.location.href = emailLink)}
        className=" text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors"
      >
        <BsEnvelopeAt className="min-w-5" /> Email
      </button>

      <button
        onClick={() => window.open(facebookLink, "_blank")}
        className="text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors "
      >
        <FaFacebook className="min-w-5" /> Facebook
      </button>

      <button
        onClick={() => window.open(whatsappLink, "_blank")}
        className="text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors"
      >
        <IoLogoWhatsapp className="min-w-5" /> WhatsApp
      </button>

      <button
        onClick={() => window.open(twitterLink, "_blank")}
        className="text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors"
      >
        <FaSquareXTwitter className="min-w-5" /> X (formerly Twitter)
      </button>

      <button
        onClick={() => window.open(linkedinLink, "_blank")}
        className="text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors"
      >
        <FaLinkedin className="min-w-5" /> LinkedIn
      </button>

      {/* Copy link button */}
      <button
        onClick={copyToClipboard}
        className="text-lg font-medium text-property-txt-700 hover:text-property-acc-100 flex gap-2 items-center duration-300 transition-colors"
      >
        <FaCopy className="min-w-5" /> Copy Link
      </button>
    </div>
  );
}
