import FilterTest from "@/components/FilterTest";
import ArchivePropertiesWraper from "@/components/propertiesPage/ArchivePropertiesWraper";
import { FilterProvider } from "@/context/FilterContext";
import { fetchProperties } from "@/lib/api";

export default async function page() {
  // const filters = {
  //   bedrooms_from: "1",
  //   bedrooms_to: "10",
  //   type: "",
  //   features: ["garage", "basement"] || [],
  // };

  // const data = await fetchProperties(filters);
  // console.log("data with filters", data);

  return (
    <div>
      <FilterProvider>
        {/* <ReactQueryWraper> */}
        <p>Title for arhive page</p>
        <FilterTest />
        <ArchivePropertiesWraper />
        {/* </ReactQueryWraper> */}
      </FilterProvider>
    </div>
  );
}
