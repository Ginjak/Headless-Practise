import AgentForm from "@/components/singlePage/contact/AgentForm";
import PropertyInfo from "@/components/singlePage/contact/PropertyInfo";
import {
  fetchCptShortSinglePost,
  fetchAllCptPosts,
  fetchImageDataAll,
} from "@/lib/api";

// Generate static params for all slugs
export async function generateStaticParams() {
  const posts = await fetchAllCptPosts({ slug: "properties" });
  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}

// Page Component
export default async function ContactPage({ params }) {
  const { slug } = await params;

  // Fetch single property data
  const data = await fetchCptShortSinglePost("properties-short", slug);

  if (!data) {
    // Return 404 if no data is found
    notFound();
  }

  const url = `${process.env.NEXT_MAIN_DOMAIN_NAME}/${data.post_type}/${slug}`;

  // Fetch related images in parallel
  // const [featuredImage, companyLogo] = await Promise.allSettled([
  //   fetchImageData([data?.featured_image]),
  //   fetchImageData([data?.team_member?.team_member_company_logo]),
  // ]);

  const featuredImage = await fetchImageDataAll([data?.featured_image]);
  const companyLogo = await fetchImageDataAll([
    data?.team_member?.team_member_company_logo,
  ]);
  return (
    <div className="max-w-5xl mx-auto px-3">
      <h2 className="font-medium pb-3 md:pb-5 text-xl md:text-3xl tracking-wide text-property-txt-700 py-4">
        Email agent
      </h2>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="relative w-full lg:w-2/3 lg:pe-20">
          <AgentForm data={data} postLink={url} />
        </div>
        <div className="w-full lg:w-1/3 lg:ps-4 overflow-y-auto mt-0 mb-6 lg:mb-0 max-h-[500px]">
          <PropertyInfo
            image={featuredImage?.[0]?.guid?.rendered || ""}
            alt={featuredImage?.[0]?.alt_text || ""}
            companyLogo={companyLogo?.[0]?.guid?.rendered || ""}
            companyLogoAlt={companyLogo?.[0]?.alt_text || ""}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
