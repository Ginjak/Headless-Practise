import Image from "next/image";
import React from "react";
import Newsletter from "./Newsletter";

export default function NewsletterOne({ data }) {
  const newsLetterType = "one";
  const {
    newsletter_1_title: title,
    newsletter_1_text: text,
    newsletter_1_first_visual_image: imgOne,
    newsletter_1_first_visual_image_alt: imgOneAlt,
    newsletter_1_second_visual_image: imgTwo,
    newsletter_1_second_visual_image_alt: imgTwoAlt,
  } = data;

  return (
    <div className="dark:bg-secondary-dark flex relative items-center overflow-hidden newsletter-one px-3 py-10 md:py-16 newsletter-one">
      <div className="bg-secondary-ligther dark:bg-primary mx-auto 2xl:container w-full flex flex-col rounded-3xl px-3 py-10 md:py-16 items-center relative overflow-hidden">
        <h2 className="font-heading text-primary dark:text-white text-3xlmd:text-4xl lg:text-6xl font-bold leading-none mb-3 max-w-4xl text-center">
          {title}
        </h2>
        <p className="text-lg text-primary-ligth dark:text-white mb-8 max-w-3xl text-center">
          {text}
        </p>
        <Newsletter type={newsLetterType} />
        {imgOne && (
          <Image
            src={imgOne}
            alt={imgOneAlt}
            height={400}
            width={400}
            className="absolute hidden sm:block top-1/2 md:top-1/3 left-0 -translate-x-1/3 max-w-56 md:max-w-80 lg:max-w-full"
            loading="lazy"
          />
        )}
        {imgTwo && (
          <Image
            src={imgTwo}
            alt={imgTwoAlt}
            height={400}
            width={400}
            className="absolute hidden sm:block top-1/2 md:top-1/3 right-0 translate-x-1/3 max-w-56 md:max-w-80 lg:max-w-full"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
