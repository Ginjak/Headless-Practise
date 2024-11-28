import { fetchPostById, fetchPostIdBySlug } from "@/lib/api";

// Page component that uses async behavior
const Page = async ({ params }) => {
  const { slug, postId: postUrl } = await params; // Destructure params correctly
  console.log(slug);
  console.log(postUrl);

  try {
    const postId = await fetchPostIdBySlug(slug, postUrl);
    const postData = await fetchPostById(slug, postId);

    console.log("Post info", postData);
    console.log("Post Id", postId);

    if (!postData) {
      return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      );
    }

    return <p>{postData?.title?.rendered}</p>;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>
          There was an error fetching the page data. Please try again later.
        </p>
      </div>
    );
  }
};

export default Page;
