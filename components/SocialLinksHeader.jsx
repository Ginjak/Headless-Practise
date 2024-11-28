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
        <Link href={facebook} target="_blank">
          <FaFacebookF className="social-btn-ligth" />
        </Link>
      )}
      {linkedin && (
        <Link href={linkedin} target="_blank" className="social-btn-ligth">
          <FaLinkedinIn />
        </Link>
      )}
      {instagram && (
        <Link href={instagram} target="_blank" className="social-btn-ligth">
          <FaInstagram />
        </Link>
      )}
      {youtube && (
        <Link href={youtube} target="_blank" className="social-btn-ligth">
          <FaYoutube />
        </Link>
      )}
      {twitter && (
        <Link href={twitter} target="_blank" className="social-btn-ligth">
          <FaXTwitter />
        </Link>
      )}
    </div>
  );
}
