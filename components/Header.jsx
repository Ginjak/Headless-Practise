import { fetchPosts } from "@/lib/api";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SocialLinksHeader from "./SocialLinksHeader";

export default async function Header({}) {
  const settings = await fetchPosts("website-settings");
  return (
    <header className="bg-white  border-b-2 border-b-gray-100 py-2">
      <div className="2xl:container mx-auto px-3 flex justify-between items-center relative">
        {/* <Logo settings={settings} /> */}
        <Navigation />
        <SocialLinksHeader data={settings} />
      </div>
    </header>
  );
}
