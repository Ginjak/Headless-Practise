import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function SocialLinksHeader({ data }) {
  console.log("links data", data[0]?.meta);
  const { facebook, linkedin, instagram, youtube, twitter } = data[0]?.meta;
  return (
    <div className="flex gap-2 items-center">
      {facebook && (
        <Link
          href={facebook}
          target="_blank"
          aria-label="Visit our Facebook page"
        >
          <FaFacebookF className="social-btn-ligth" />
        </Link>
      )}
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our LinkedIn page"
        >
          <FaLinkedinIn />
        </Link>
      )}
      {instagram && (
        <Link
          href={instagram}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our Instagram page"
        >
          <FaInstagram />
        </Link>
      )}
      {youtube && (
        <Link
          href={youtube}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our Youtube page"
        >
          <FaYoutube />
        </Link>
      )}
      {twitter && (
        <Link
          href={twitter}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our Twitter/X page"
        >
          <FaXTwitter />
        </Link>
      )}
    </div>
  );
}
