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

        return (
          <Link href={postLink} key={post?.id}>
            <div>
              {featuredImage && (
                <div className="relative w-[500px] h-64">
                  <Image
                    src={featuredImage}
                    alt={featuredImageAltText || "Image"}
                    fill
                    className="object-cover"
                    priority={true}
                  />
                </div>
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
