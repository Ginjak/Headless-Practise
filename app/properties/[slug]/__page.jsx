import { fetchAllCptPosts } from "@/lib/api";

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const posts = await fetchAllCptPosts({ slug: "properties" });
  console.log(posts); // Add this to inspect the returned data

  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}

// Page component that fetches data for a specific slug and renders the post content
export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div>
      <p>Testing</p>
    </div>
  );
}
