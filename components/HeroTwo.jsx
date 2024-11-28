import Image from "next/image";
import Link from "next/link";

export default function HeroTwo({ data }) {
  const {
    hero_2_title: title,
    hero_2_subtitle: subtitle,
    hero_2_button_text: button_txt,
    hero_2_button_link: button_link,
    hero_2_image: image,
    hero_2_image_alternative_text: alt,
    hero_2_display_button: display_btn,
  } = data;

  // Function to parse and highlight text between /- and -/
  const parseTitle = (title) => {
    // Regular expression to match text between /- and -/ (non-greedy)
    const regex = /\/-(.*?)\-\//g;

    // Split the title into regular text and highlighted parts
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(title)) !== null) {
      // Add the text before the match
      if (match.index > lastIndex) {
        parts.push(title.slice(lastIndex, match.index));
      }
      // Add the highlighted text with styling
      parts.push(
        <span key={match.index} className="text-secondary">
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last match
    if (lastIndex < title.length) {
      parts.push(title.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="relative h-screen text-white overflow-hidden hero-two">
      <div className="absolute inset-0">
        <div className="object-cover object-center w-full h-full absolute">
          <Image src={image} alt={alt} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-3">
        <h1 className="font-heading text-4xl md:text-6xl font-bold leading-none mb-3">
          {parseTitle(title)} {/* Call the parseTitle function */}
        </h1>
        <p className="text-lg text-white-dark mb-8">{subtitle}</p>
        {display_btn === "true" && button_link && button_txt && (
          <Link href={button_link} className="btn-main btn-ligth">
            {button_txt}
          </Link>
        )}
      </div>
    </div>
  );
}
