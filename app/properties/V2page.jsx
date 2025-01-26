import FilterTest from "@/components/FilterTest";
import ArchivePropertiesWraper from "@/components/propertiesPage/ArchivePropertiesWraper";
import { FilterProvider } from "@/context/FilterContext";
import { fetchProperties } from "@/lib/api";

export default async function page() {
  return (
    <div>
      <FilterProvider>
        <p>Title for arhive page</p>
        <FilterTest />
        <ArchivePropertiesWraper />
      </FilterProvider>
    </div>
  );
}
