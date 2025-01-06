import Image from "next/image";
import Link from "next/link";
import PhoneRevealBtn from "./PhoneRevealBtn";

export default function AgentSinglePage({
  name,
  surname,
  phone,
  email,
  agentPhoto,
  agentPhotoAlt,
  companyPhoto,
  companyPhotoAlt,
}) {
  return (
    <div className="team-member-wraper bg-mainBg py-10 px-6 rounded-xl mt-4 text-white shadow-small">
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="name-surname">
          <p className="text-white/80 text-xs">Agent</p>
          <p className="text-xl font-bold tracking-wider">
            {name} {surname}
          </p>
        </div>
        <div className="avatar w-32 h-32 relative rounded-full overflow-hidden shadow-medium border-2 border-slate-100/50">
          <Image
            src={agentPhoto || "/avatar_placeholder.webp"}
            alt={agentPhotoAlt || "Avatar placeholder"}
            fill
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="contacts flex flex-col text-center bg-mainTxt p-4 rounded-lg gap-3">
        <PhoneRevealBtn text={"Phone number"} phone={phone} />

        <Link
          href={`mailto:${email}`}
          className="rounded-lg border-2 border-mainBg/80 bg-mainBg/80 hover:bg-mainBg/50 hover:border-mainBg/50 text-white py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider"
        >
          Email
        </Link>
      </div>
      <div className="company-avatar relative mt-4 flex justify-end items-end">
        <Image
          src={companyPhoto}
          alt={companyPhotoAlt || "Logo placeholder"}
          width={115}
          height={56}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
