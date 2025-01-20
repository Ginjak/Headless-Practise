"use client";
import { useRouter } from "next/navigation";
import { TiArrowBack } from "react-icons/ti";
export default function SinglePostReturnBtn() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleBack}
      className="text-property-txt-700 hover:text-property-acc-100 text-base sm:text-xl flex gap-2 items-center duration-200 transition-colors"
    >
      <TiArrowBack />
      Back to searach link
    </button>
  );
}
