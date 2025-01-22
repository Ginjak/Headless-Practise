import PhoneRevealBtn from "./PhoneRevealBtn";

import { fetchCptSinglePost } from "@/lib/api";
import SinglePostContactFormBtn from "./SinglePostContactFormBtn";
import ImageWithSpinner from "../ImageWithSpinner";

export default async function AgentSinglePage({
  name,
  surname,
  phone,
  agentPhoto,
  agentPhotoAlt,
  companyPhoto,
  companyPhotoAlt,
  slug,
}) {
  return (
    <div className="team-member-wraper bg-property-bg-200 lg:py-10 lg:px-6 lg:rounded-xl lg:mt-4 text-property-txt-700 lg:border-[1px] lg:border-property-txt-700/10 lg:shadow-md">
      <div className="hidden lg:flex justify-between items-center mb-6 px-4">
        <div className="name-surname">
          <p className="text-property-txt-700/60 text-xs">Agent</p>
          <p className="text-xl font-bold tracking-wider">
            {name} {surname}
          </p>
        </div>
        <div className="hidden lg:block avatar w-32 h-32 relative rounded-full overflow-hidden shadow-medium border-2 border-property-bg-100">
          <ImageWithSpinner
            src={agentPhoto}
            alt={agentPhotoAlt}
            fill
            sizes={"(min-width: 1024px) 125px"}
            className="object-cover"
            fillContainerClassName={"w-32 h-32"}
          />
          {/* <Image
            src={agentPhoto || "/avatar_placeholder.webp"}
            alt={agentPhotoAlt || "Avatar placeholder"}
            fill
            sizes="(min-width: 1024px) 125px"
            className="object-cover"
          /> */}
        </div>
      </div>
      <div className="contacts flex lg:flex-col text-center bg-property-pr-300 lg:bg-property-pr-300/20 p-2 lg:p-4 lg:rounded-lg gap-3">
        <PhoneRevealBtn text={"Phone number"} phone={phone} />

        <SinglePostContactFormBtn />
      </div>
      <div className="hidden lg:flex relative mt-4 justify-end items-end">
        <ImageWithSpinner
          src={companyPhoto}
          alt={companyPhotoAlt}
          width={115}
          height={56}
        />
      </div>
    </div>
  );
}
