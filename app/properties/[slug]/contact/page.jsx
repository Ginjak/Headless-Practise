import AgentForm from "@/components/singlePage/contact/AgentForm";

import PropertyInfo from "@/components/singlePage/contact/PropertyInfo";
import { fetchCptShortSinglePost, fetchImageData } from "@/lib/api";

export default async function page({ params }) {
  const { slug } = await params;
  console.log("slug", slug);
  // Fetch single property data
  const data = await fetchCptShortSinglePost("properties-short", slug);
  const url = `${process.env.NEXT_MAIN_DOMAIN_NAME}/${data.post_type}/${slug}`;
  console.log("base url", url);

  const [featuredImage, companyLogo] = await Promise.all([
    fetchImageData([data?.featured_image]),
    fetchImageData([data?.team_member?.team_member_company_logo]),
  ]);

  console.log("featured", featuredImage);
  console.log("compnay", companyLogo);

  // If no data is found, return a fallback page
  if (!data) {
    // Change this to 404 component
    return <p>No data found for this property.</p>;
  }
  return (
    <div className="max-w-5xl mx-auto px-3">
      <h2 className="font-medium  pb-3 md:pb-5 text-xl md:text-3xl tracking-wide text-property-txt-700 py-4">
        Email agent
      </h2>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pe-20">
          <AgentForm data={data} postLink={url} />
        </div>
        <div className="w-full lg:block lg:w-1/3 lg:ps-4 overflow-y-auto mt-0 mb-6 lg:mb-0">
          <PropertyInfo
            image={featuredImage[0].guid?.rendered}
            alt={featuredImage[0].alt_text}
            companyLogo={companyLogo[0].guid?.rendered}
            companyLogoAlt={companyLogo[0].alt_text}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
