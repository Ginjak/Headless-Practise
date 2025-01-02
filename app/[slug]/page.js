import ArchiveButton from "@/components/ArchiveButton";
import ArchivePosts from "@/components/ArchivePosts";
import Sections from "@/components/Sections";
import {
  fetchFrontPageID,
  fetchPageData,
  fetchPagesSlugs,
  fetchPosts,
  fetchPostsByCategory,
  fetchCptNames,
} from "@/lib/api";
import Link from "next/link";
import { redirect } from "next/navigation"; // Correct redirect import

// Page component that uses async behavior
const Page = async ({ params }) => {
  const { slug } = await params; // Destructure slug from params
  const allPagesSlugs = await fetchPagesSlugs();
  const pageData = await fetchPageData(slug); // Fetch page data based on slug
  const frontPageID = await fetchFrontPageID(); // Fetch the front page ID from WP
  const posts = await fetchPosts(slug);
  const test = await fetchPosts("recipies");
  const postsByCat = await fetchPostsByCategory(slug, "first");
  const postTypes = await fetchCptNames();

  console.log("Slug", slug);
  console.log("Front Page ID:", frontPageID);
  console.log("Page Data:", pageData[0]);
  console.log("All slugs", allPagesSlugs);
  console.log("Posts", posts);
  console.log("Posts length", posts.length);
  console.log("Test", test);
  console.log("Post by categories", postsByCat);
  console.log("Post types", postTypes);

  if (
    (posts.length === 0 && pageData.length === 0) ||
    slug === "website-settings"
  ) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  // If the page matches the front page ID, redirect to '/'
  if (pageData[0]?.id === frontPageID) {
    // Perform redirect to homepage (root route)
    redirect("/");
  }

  // if (posts.length > 0 && slug !== "website-settings") {
  //   return (
  //     <div>
  //       <h1>This is archive page</h1>
  //       <ArchiveButton label={"Dance"} />
  //       <ArchivePosts posts={posts} />
  //     </div>
  //   );
  // }

  if (pageData.length > 0) {
    return (
      <main>
        <Sections data={pageData[0]} />
      </main>
    );
  }
  return (
    <div>
      <h1>Testing</h1>
      <p>{slug}</p>
    </div>
  );
};

export default Page;
