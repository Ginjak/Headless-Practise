import { useFilterContext } from "@/context/FilterContext";

const Pagination = ({ count, cpt }) => {
  const { filters, setFilters } = useFilterContext();
  const currentPage = !filters.page ? 1 : Number(filters.page);
  const postPerPage = Number(filters.per_page);
  const pageCount = Math.ceil(count / postPerPage);

  const handleFilterNavigation = (filtersData) => {
    const queryParams = Object.entries(filtersData)
      .filter(
        ([key, value]) =>
          value !== "" &&
          value !== undefined &&
          key !== "per_page" &&
          !(Array.isArray(value) && value.length === 0)
      )
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map((val) => `${key}[]=${encodeURIComponent(val)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");

    const newUrl = `/${cpt}?${queryParams}`;
    window.history.pushState({}, "", newUrl); // Navigate to the new URL with filters
  };

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const updatedFilters = { ...filters, page: next };
    setFilters(updatedFilters);
    handleFilterNavigation(updatedFilters);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const updatedFilters = { ...filters, page: prev };
    setFilters(updatedFilters);
    handleFilterNavigation(updatedFilters);
  };

  if (pageCount <= 1) return null;

  return (
    <div>
      <p>
        Showing <span>{(currentPage - 1) * postPerPage + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * postPerPage}
        </span>{" "}
        of <span>{count}</span> results
      </p>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
