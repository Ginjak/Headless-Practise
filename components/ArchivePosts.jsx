import { fetchPostsByCategory } from "@/lib/api";
import { replaceBaseURL } from "@/lib/utils/replaceBaseUrl";
import Image from "next/image";
import Link from "next/link";

export default async function ArchivePosts({ posts }) {
  return (
    <>
      {posts.map((post) => {
        const featuredImage = post?.meta?.featured_image[0];
        const featuredImageAltText = post?.meta?.featured_image_alt_text;
        const postLink = replaceBaseURL(post?.link);

        console.log("Post URL:", postLink); // Log the post link
        console.log("Featured Image URL:", featuredImage); // Log the featured image URL
        console.log("Featured Image Alt Text:", featuredImageAltText); // Log the alt text

        return (
          <Link href={postLink} key={post?.id}>
            <div>
              {/* Conditionally render the image if the URL is available */}
              {featuredImage && (
                <Image
                  src={featuredImage}
                  width={500}
                  height={500}
                  alt={featuredImageAltText || "Image"}
                />
              )}

              <h2>{post?.title}</h2>
              <p>{post?.meta?.price}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
