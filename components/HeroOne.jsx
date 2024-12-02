import Image from "next/image";
import Link from "next/link";
export default function HeroOne({ data }) {
  const {
    hero_1_title: title,
    hero_1_subtitle: subtitle,
    hero_1_text: text,
    hero_1_primary_button_text: primary_btn_txt,
    hero_1_primary_button_link: primary_btn_link,
    hero_1_secondary_button_text: secondary_btn_txt,
    hero_1_secondary_button_link: secondary_btn_link,
    hero_1_image: image,
    hero_1_image_alternative_text: alt,
  } = data;

  return (
    <>
      <div className="bg-white dark:bg-secondary-dark flex relative items-center overflow-hidden hero-one">
        <div className="mx-auto 2xl:container w-full flex px-3 py-10 md:py-16 ">
          <div className="sm:w-2/4 lg:w-2/5 flex flex-col">
            <span className="w-20 h-2 bg-primary dark:bg-white mb-12"></span>
            {title && (
              <h1 className="font-heading uppercase text-6xl md:text-8xl font-black flex flex-col leading-none dark:text-white text-primary">
                {title}
                {subtitle && (
                  <span className="text-5xl sm:text-7xl">{subtitle}</span>
                )}
              </h1>
            )}
            {text && (
              <p className="text-sm sm:text-base text-primary dark:text-white">
                {text}
              </p>
            )}
            <div className="flex mt-8 gap-x-4">
              {primary_btn_link && primary_btn_txt && (
                <Link href={primary_btn_link} className="btn-main">
                  {primary_btn_txt}
                </Link>
              )}
              {secondary_btn_link && secondary_btn_txt && (
                <Link href={secondary_btn_link} className="btn-transparent">
                  {secondary_btn_txt}
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:flex sm:w-2/4 lg:w-3/5 justify-center items-end">
            <Image
              src={image}
              alt={alt}
              width={660}
              height={597}
              className="object-contain max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
