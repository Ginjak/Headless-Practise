import Sections from "@/components/Sections";
import { fetchFrontPageID, fetchPageData, fetchPosts } from "@/lib/api";
import { redirect } from "next/navigation"; // Correct redirect import

// Page component that uses async behavior
const Page = async ({ params }) => {
  const { slug } = await params; // Destructure slug from params
  const pageData = await fetchPageData(slug); // Fetch page data based on slug
  const frontPageID = await fetchFrontPageID(); // Fetch the front page ID from WP
  const posts = await fetchPosts(slug);

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
