import {
  fetchCptSinglePost,
  fetchAllCptPosts,
  fetchImageData,
} from "@/lib/api";
import Slider from "@/components/singlePage/Slider";
import AgentSinglePage from "@/components/singlePage/AgentSinglePage";
import KeyFeatures from "@/components/singlePage/KeyFeatures";
import SinglePostDivider from "@/components/singlePage/SinglePostDivider";
import SinglePostDescription from "@/components/singlePage/SinglePostDescription";
import SinglePostFeatures from "@/components/singlePage/SinglePostFeatures";
import SinglePostLocalAreaInfo from "@/components/singlePage/SinglePostLocalAreaInfo";
import SinglePostMap from "@/components/singlePage/SinglePostMap";
import SimilarProperties from "@/components/singlePage/SimilarProperties";
import ShareButton from "@/components/ShareButton";

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

  // If no data is found, return a fallback page
  if (!data) {
    return <p>No data found for this property.</p>;
  }

  // Fetch additional images
  let images = [];
  let companyLogo, memberPhoto, featuredImage;

  const imagePromises = [
    data?.slider_images && fetchImageData(data.slider_images.split(",")),
    data?.team_member_company_logo &&
      fetchImageData([data.team_member_company_logo]),
    data?.team_member_picture && fetchImageData([data.team_member_picture]),
    data?.featured_image && fetchImageData([data.featured_image]),
  ].filter(Boolean);

  const [sliderImages, companyLogoData, memberPhotoData, featuredImageData] =
    await Promise.all(imagePromises);

  images = sliderImages || [];
  companyLogo = companyLogoData?.[0];
  memberPhoto = memberPhotoData?.[0];
  featuredImage = featuredImageData?.[0];

  // Render the static property page
  return (
    <>
      <p>Back to search + Share buttons</p>
      <ShareButton data={data} image={featuredImage} />
      <div className="max-w-7xl mx-auto flex px-3">
        <div className="content w-full lg:w-2/3 mt-20">
          <div className="slider-wraper mb-6">
            <Slider images={images} />
          </div>
          <div className="main-details-wraper my-16 mx-10">
            <h2 className="text-property-txt-700 text-lg font-medium tracking-wide mb-3">
              {data?.bedrooms} bed {data?.property_type} for sale{" "}
              <span className="font-normal text-property-txt-700/60">
                {data?.address_line},{" "}
                {data?.borough ? data?.borough : data?.city}{" "}
                {data?.postcode?.split(" ")[0]}
              </span>
            </h2>
            <div className="price-date-wraper flex justify-between items-center">
              <p
                className={`text-property-txt-700 text-4xl font-bold tracking-wide`}
              >
                £
                {data?.original_price &&
                  new Intl.NumberFormat().format(data.original_price)}
              </p>
              <p className="text-property-txt-700/60 font-heading">
                Added on{" "}
                {new Date(data?.post_date)
                  .toLocaleDateString("en-GB")
                  .replace(/-/g, "/")}
              </p>
            </div>
          </div>
          <div className="description-wraper p-10 rounded-xl bg-property-pr-300/20 text-white w-full mb-6 ">
            <KeyFeatures
              bedrooms={data?.bedrooms}
              bathrooms={data?.bathrooms}
              receptions={data?.receptions}
              size={data?.size_in_sq_ft}
            />
            <SinglePostDivider />
            <SinglePostDescription
              title={"Description"}
              description={data?.property_description}
            />
            <SinglePostDivider />
            <SinglePostFeatures
              title={"Features"}
              features={data?.features}
              pet_friendly={data?.pet_friendly}
            />
            <SinglePostDivider />
          </div>
          <SinglePostLocalAreaInfo
            longitude={data?.longitude}
            latitude={data?.latitude}
          />
          <SinglePostMap lat={data?.latitude} lng={data?.longitude} />
          {/* <SimilarProperties
            latitudePoint={data?.latitude}
            longitudePoint={data?.longitude}
            bedrooms={data?.bedrooms}
            bathrooms={data?.bathrooms}
            property_type={["bungalow"]}
          /> */}
        </div>
        <div className="agent-info w-full hidden lg:block lg:w-1/3 ps-4 sticky top-0 h-screen overflow-y-auto mt-16">
          <AgentSinglePage
            name={data?.team_member_name}
            surname={data?.team_member_surname}
            phone={data?.team_member_phone}
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
