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
  const {
    facebook,
    linkedin,
    instagram,
    youtube,
    twitter,
    show_facebook_icon: show_facebook,
    show_linkedin_icon: show_linkedin,
    show_instagram_icon: show_instagram,
    show_youtube_icon: show_youtube,
    show_twitter_icon: show_twitter,
  } = data[0]?.meta;
  return (
    <div className="flex gap-2 items-center">
      {facebook && show_facebook === "true" && (
        <Link
          href={facebook}
          target="_blank"
          aria-label="Visit our Facebook page"
        >
          <FaFacebookF className="social-btn-ligth" />
        </Link>
      )}
      {linkedin && show_linkedin === "true" && (
        <Link
          href={linkedin}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our LinkedIn page"
        >
          <FaLinkedinIn />
        </Link>
      )}
      {instagram && show_instagram === "true" && (
        <Link
          href={instagram}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our Instagram page"
        >
          <FaInstagram />
        </Link>
      )}
      {youtube && show_youtube === "true" && (
        <Link
          href={youtube}
          target="_blank"
          className="social-btn-ligth"
          aria-label="Visit our Youtube page"
        >
          <FaYoutube />
        </Link>
      )}
      {twitter && show_twitter === "true" && (
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
