import { fetchPosts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Logo() {
  const defaultLogo = `${process.env.NEXT_DOMAIN_NAME}/wp-content/themes/twentytwentyfive/images/Logo_default.webp`;
  const headerLogo = (await fetchPosts("website-settings"))?.[0]?.meta
    ?.header_logo;

  const headerLogoAlt = (await fetchPosts("website-settings"))?.[0]?.meta
    ?.header_logo_alt;

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
        priority
      />
    </Link>
  );
}
