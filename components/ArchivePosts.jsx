import { fetchPostsByCategory } from "@/lib/api";
import { replaceBaseURL } from "@/lib/utils/replaceBaseUrl";
import Image from "next/image";
import Link from "next/link";

export default async function ArchivePosts({ posts }) {
  return (
    <>
      {posts.map((post) => {
        return (
          <Link href={replaceBaseURL(post?.link)} key={post?.id}>
            <div>
              <img src={post?.meta?.featured_image} alt="" />
              <Image
                src={post?.meta?.featured_image}
                width={500}
                height={500}
                alt={post?.meta?.featured_image_alt_text}
              ></Image>
              <h2>{post?.title}</h2>
              <p>{post?.meta?.price}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
