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

// Generate static paths for all properties
export async function generateStaticParams() {
  const posts = await fetchAllCptPosts({ slug: "properties" });
  console.log(posts);

  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;

  // Fetch single property data
  const data = await fetchCptSinglePost("properties", slug);
  console.log("Single post data", data);

  // If no data is found, return a fallback page
  if (!data) {
    return <p>No data found for this property.</p>;
  }

  // Fetch additional images
  let images = [];
  let companyLogo, memberPhoto;

  const imagePromises = [
    data?.slider_images && fetchImageData(data.slider_images.split(",")),
    data?.team_member_company_logo &&
      fetchImageData([data.team_member_company_logo]),
    data?.team_member_picture && fetchImageData([data.team_member_picture]),
  ].filter(Boolean);

  const [sliderImages, companyLogoData, memberPhotoData] = await Promise.all(
    imagePromises
  );

  images = sliderImages || [];
  companyLogo = companyLogoData?.[0];
  memberPhoto = memberPhotoData?.[0];

  // Render the static property page
  return (
    <>
      <p>Back to search + Share buttons</p>
      <div className="max-w-7xl mx-auto flex px-3">
        <div className="content w-full lg:w-2/3 mt-20">
          <div className="slider-wraper mb-6">
            <Slider images={images} />
          </div>
          <div className="main-details-wraper my-16 mx-10">
            <h2 className="text-mainTxt text-lg font-medium tracking-wide mb-3">
              {data?.bedrooms} bed {data?.property_type} for sale{" "}
              <span className="font-normal text-mainTxt-ligther">
                {data?.address_line},{" "}
                {data?.borough ? data?.borough : data?.city}{" "}
                {data?.postcode?.split(" ")[0]}
              </span>
            </h2>
            <div className="price-date-wraper flex justify-between items-center">
              <p className={`text-mainTxt text-4xl font-bold tracking-wide`}>
                £
                {data?.original_price &&
                  new Intl.NumberFormat().format(data.original_price)}
              </p>
              <p className="text-mainTxt-ligther/70 font-heading">
                Added on{" "}
                {new Date(data?.post_date)
                  .toLocaleDateString("en-GB")
                  .replace(/-/g, "/")}
              </p>
            </div>
          </div>
          <div className="description-wraper p-10 rounded-xl bg-mainBg-dark text-white w-full mb-6 shadow-small">
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
