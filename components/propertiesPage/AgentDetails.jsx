import { fetchImageDataById } from "@/lib/api";
import SinglePostDivider from "../singlePage/SinglePostDivider";
import ImageWithSpinner from "../ImageWithSpinner";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { BsEnvelopeAt } from "react-icons/bs";
import Image from "next/image";

export default async function AgentDetails({ property, agentImgId }) {
  console.log("agent img id", agentImgId);
  const agentImg = await fetchImageDataById(agentImgId);

  return (
    <div>
      <SinglePostDivider className={"my-3"} />
      <div className="flex xs:flex-col sm:flex-row items-between gap-4">
        <div className="flex justify-start xs:justify-between sm:justify-start gap-3 items-center w-full">
          <Image
            src={
              agentImg?.media_details?.sizes?.thumbnail?.source_url ||
              agentImg?.guid?.rendered ||
              "/agent_placeholder.webp"
            }
            alt={agentImg?.alt_text || "Agent avart image"}
            width={40}
            height={40}
            className={"rounded-full"}
          />

          <p className="flex flex-col leading-none text-sm text-property-txt-700">
            {property?.team_member_name}{" "}
            <span>{property?.team_member_surname}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`tel:${property?.team_member_phone}`}
            className="p-2 bg-property-acc-100 hover:bg-property-acc-300 rounded-lg text-white transition-colors duration-300 w-auto flex justify-center xs:w-full sm:width-auto text-center "
          >
            <FaPhone />
          </Link>
          <Link
            href={`${property?.post_type}/${property?.slug}/contact`}
            className="p-2 bg-property-acc-100 hover:bg-property-acc-300 rounded-lg text-white transition-colors duration-300 w-auto flex justify-center xs:w-full sm:width-auto text-center"
          >
            <BsEnvelopeAt />
          </Link>
        </div>
      </div>
    </div>
  );
}
