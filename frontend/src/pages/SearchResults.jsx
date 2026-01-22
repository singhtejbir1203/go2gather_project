import EmptySearchState from "@/features/search/components/EmptySearchState";
import FiltersSidebar from "@/features/search/components/FiltersSidebar";
import RideList from "@/features/search/components/RideList";
import SearchBar from "@/features/search/components/SearchBar";
import { SearchFilterProvider } from "@/features/search/context/SearchFilterContext";
import { useParams } from "react-router-dom";

function SearchResults() {
  const params = useParams();

  const hasSearchParams =
    params.fromLat &&
    params.fromLng &&
    params.toLat &&
    params.toLng &&
    params.date;

  const initialValues = hasSearchParams
    ? {
        from: {
          lat: params.fromLat,
          lng: params.fromLng,
          label: params.fromLabel || "",
        },
        to: {
          lat: params.toLat,
          lng: params.toLng,
          label: params.toLabel || "",
        },
        date: params.date,
        passengers: Number(params.passengers || 1),
      }
    : null;
  return (
    <SearchFilterProvider>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <SearchBar initialValues={initialValues} />
          </div>
        </div>

        {!hasSearchParams && <EmptySearchState />}

        {hasSearchParams && (
          <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <FiltersSidebar />
            </div>

            <div className="col-span-12 md:col-span-9">
              <RideList />
            </div>
          </div>
        )}
      </div>
    </SearchFilterProvider>
  );
}

export default SearchResults;
