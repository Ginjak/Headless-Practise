import { fetchAndBuildMenuTree } from "@/lib/api";
import NavItems from "./NavItems";

export default async function Navigation() {
  const menuItems = await fetchAndBuildMenuTree();
  console.log("menu items", menuItems);

  return (
    <nav className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
      {/* Pass the items to NavItems, start with level 1 for the root */}
      <NavItems items={menuItems} level={1} />
    </nav>
  );
}
