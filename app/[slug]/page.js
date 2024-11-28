import {
  fetchFrontPageID,
  fetchPageData,
  fetchPagesSlugs,
  fetchPosts,
} from "@/lib/api";
import Link from "next/link";
import { redirect } from "next/navigation"; // Correct redirect import

// Page component that uses async behavior
const Page = async ({ params }) => {
  const { slug } = await params; // Destructure slug from params
  const allPagesSlugs = await fetchPagesSlugs();
  const pageData = await fetchPageData(slug); // Fetch page data based on slug
  const frontPageID = await fetchFrontPageID(); // Fetch the front page ID from WP
  const postsBySlug = await fetchPosts(slug);

  console.log("Slug", slug);
  console.log("Front Page ID:", frontPageID);
  console.log("Page Data:", pageData);
  console.log("All slugs", allPagesSlugs);
  console.log("Posts", postsBySlug);
  console.log("Posts length", postsBySlug.length);

  if (
    (postsBySlug.length === 0 && pageData.length === 0) ||
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

  if (postsBySlug.length > 0 && slug !== "website-settings") {
    return (
      <div>
        <h1>This is archive page</h1>
        {postsBySlug.map((post) => (
          <Link key={post.id} href={`${slug}/${post.slug}`}>
            {post?.title?.rendered}
          </Link>
        ))}
      </div>
    );
  }

  if (pageData.length > 0) {
    return (
      <div>
        <h1>This is page</h1>
      </div>
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
