import Image from "next/image";
import Link from "next/link";
import PhoneRevealBtn from "./PhoneRevealBtn";

import { fetchCptSinglePost } from "@/lib/api";
import SinglePostContactFormBtn from "./SinglePostContactFormBtn";

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
  const data = await fetchCptSinglePost("properties", slug);

  return (
    <div className="team-member-wraper bg-property-bg-200 py-10 px-6 rounded-xl mt-4 text-property-txt-700 border-[1px] border-property-txt-700/10 shadow-md">
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="name-surname">
          <p className="text-property-txt-700/60 text-xs">Agent</p>
          <p className="text-xl font-bold tracking-wider">
            {name} {surname}
          </p>
        </div>
        <div className="avatar w-32 h-32 relative rounded-full overflow-hidden shadow-medium border-2 border-property-bg-100">
          <Image
            src={agentPhoto || "/avatar_placeholder.webp"}
            alt={agentPhotoAlt || "Avatar placeholder"}
            fill
            sizes="(min-width: 1024px) 125px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="contacts flex flex-col text-center bg-property-pr-300/20 p-4 rounded-lg gap-3">
        <PhoneRevealBtn text={"Phone number"} phone={phone} />

        <SinglePostContactFormBtn />
      </div>
      <div className="company-avatar relative mt-4 flex justify-end items-end">
        <Image
          src={companyPhoto}
          alt={companyPhotoAlt || "Logo placeholder"}
          width={115}
          height={56}
        />
      </div>
    </div>
  );
}
