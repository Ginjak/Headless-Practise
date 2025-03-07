import {
  fetchCptSinglePost,
  fetchAllCptPosts,
  fetchImageDataAll,
} from "@/lib/api";
import Slider from "@/components/singlePage/Slider";
import AgentSinglePage from "@/components/singlePage/AgentSinglePage";
import KeyFeatures from "@/components/singlePage/KeyFeatures";
import SinglePostDivider from "@/components/singlePage/SinglePostDivider";
import SinglePostDescription from "@/components/singlePage/SinglePostDescription";
import SinglePostFeatures from "@/components/singlePage/SinglePostFeatures";
import SinglePostLocalAreaInfo from "@/components/singlePage/SinglePostLocalAreaInfo";
import LazyLoadMap from "@/components/singlePage/LazyLoadMap";
import ShareButton from "@/components/ShareButton";
import ShareonSocialMobile from "@/components/singlePage/ShareOnSocialMobile";

import SinglePostReturnBtn from "@/components/singlePage/SinglePostReturnBtn";
import SimilarPropertiesSlider from "@/components/singlePage/SimilarPropertiesSlider";
import SimilarProperties from "@/components/singlePage/SimilarProperties";

// Generate static paths for all properties
export async function generateStaticParams() {
  const posts = await fetchAllCptPosts({ slug: "properties" });
  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;

  // Fetch single property data
  const data = await fetchCptSinglePost("properties", slug);
  console.log("properties long data", data);
  // If no data is found, return a fallback page
  if (!data) {
    // Change this to 404 component
    return <p>No data found for this property.</p>;
  }

  // Fetch images concurrently using Promise.all for better performance
  const imagePromises = [
    data?.slider_images && fetchImageDataAll(data.slider_images.split(",")),
    data?.agent?.team_member_company_logo &&
      fetchImageDataAll([data.agent.team_member_company_logo]),
    data?.agent?.team_member_picture &&
      fetchImageDataAll([data.agent.team_member_picture]),
    data?.featured_image && fetchImageDataAll([data.featured_image]),
  ].filter(Boolean);

  // Resolve all image data
  const [sliderImages, companyLogoData, memberPhotoData, featuredImageData] =
    await Promise.all(imagePromises);

  const images = sliderImages || [];
  const companyLogo = companyLogoData?.[0];
  const memberPhoto = memberPhotoData?.[0];
  const featuredImage = featuredImageData?.[0];

  // Reduce unnecessary re-renders and improve LCP by rendering above-the-fold content first
  return (
    <>
      <div className="max-w-7xl mx-auto px-3">
        <div className="social-share-return-wraper flex justify-between items-center">
          <SinglePostReturnBtn />
          <div className="hidden sm:flex gap-2 items-center py-3">
            <ShareButton
              data={data}
              image={featuredImage}
              btnText={"Share"}
              btnClass={"font-medium text-xl"}
            />
          </div>
          <div className="block sm:hidden">
            <ShareonSocialMobile data={data} btnClass={"font-medium text-xl"} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex px-3">
        <div className="content w-full lg:w-2/3 mt-4">
          {/* Slider and property details */}
          <div className="slider-wraper mb-6">
            <Slider images={images} imgIds={data.slider_images.split(",")} />
          </div>

          <div className="main-details-wraper my-8 md:my-16 mx-6 md:mx-10">
            <h2 className="text-property-txt-700  text-base md:text-lg font-medium tracking-wide mb-3">
              {data?.bedrooms} bed {data?.property_type} for sale{" "}
              <span className="font-normal text-property-txt-700/60">
                {data?.address_line},{" "}
                {data?.borough ? data?.borough : data?.city}{" "}
                {data?.postcode?.split(" ")[0]}
              </span>
            </h2>

            <div className="price-date-wraper flex justify-between items-center">
              <p className="text-property-txt-700 text-2xl md:text-4xl font-bold tracking-wide">
                £
                {data?.original_price &&
                  new Intl.NumberFormat().format(data.original_price)}
              </p>
              <p className="text-property-txt-700/60 font-heading text-sm md:text-base">
                Added on{" "}
                {new Date(data?.post_date)
                  .toLocaleDateString("en-GB")
                  .replace(/-/g, "/")}
              </p>
            </div>
          </div>

          {/* Description and Features */}
          <div className="description-wraper p-6 md:p-10 rounded-xl bg-property-pr-300/20 text-white w-full mb-6">
            <KeyFeatures
              bedrooms={data?.bedrooms}
              bathrooms={data?.bathrooms}
              receptions={data?.receptions}
              size={data?.size_in_sq_ft}
            />
            <SinglePostDivider className={"my-5"} />
            <SinglePostDescription
              title="Description"
              description={data?.property_description}
            />
            <SinglePostDivider className={"my-5"} />
            <SinglePostFeatures
              title="Features"
              features={data?.features}
              pet_friendly={data?.pet_friendly}
            />
            <SinglePostDivider className={"my-5"} />
          </div>

          {/* Local Area and Map */}
          <SinglePostLocalAreaInfo
            longitude={data?.longitude}
            latitude={data?.latitude}
          />
          <LazyLoadMap lat={data?.latitude} lng={data?.longitude} />
          {/* <SinglePostMap lat={data?.latitude} lng={data?.longitude} /> */}
          <SimilarProperties />
          <p className="mt-8">ttest</p>
        </div>

        {/* Agent Information (only visible on larger screens) */}
        <div className="z-50 lg:z-0 w-full fixed bottom-0 left-0 right-0 lg:block lg:w-1/3 lg:ps-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto mt-0">
          <AgentSinglePage
            name={data?.agent?.team_member_name}
            surname={data?.agent?.team_member_surname}
            phone={data?.agent?.team_member_phone}
            email={data?.team_member_email}
            agentPhoto={memberPhoto?.source_url}
            agentPhotoAlt={memberPhoto?.alt_text}
            companyPhoto={companyLogo?.source_url}
            companyPhotoAlt={companyLogo?.alt_text}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
