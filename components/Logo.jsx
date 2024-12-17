import Image from "next/image";
import Link from "next/link";

export default async function Logo({ settings }) {
  const defaultLogo = `${process.env.NEXT_DOMAIN_NAME}/wp-content/themes/twentytwentyfive/images/Logo_default.webp`;
  const headerLogo = settings[0]?.meta?.header_logo[0];

  const headerLogoAlt = settings[0].meta.header_logo_alt[0];

  console.log("asdasd", headerLogo);
  console.log("alt", headerLogoAlt);
  return (
    <Link href="/">
      <Image
        src={headerLogo || defaultLogo}
        // src="http://headless-practise.local/wp-content/uploads/2024/11/Logo_blue.svg"
        alt={headerLogoAlt}
        width={200}
        height={100}
        className="w-full max-w-[150px] h-auto"
        priority={true}
      />
    </Link>
  );
}
