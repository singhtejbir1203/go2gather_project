import { useSearchFilters } from "../context/SearchFilterContext";

function FiltersSidebar() {
  const {
    sortBy,
    setSortBy,
    timeFilters,
    setTimeFilters,
    verifiedOnly,
    setVerifiedOnly,
  } = useSearchFilters();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-6">
      {/* SORT */}
      <div>
        <h3 className="font-semibold mb-3">Sort by</h3>

        <div className="space-y-2 text-sm">
          {[
            { key: "earliest", label: "Earliest departure" },
            { key: "lowestPrice", label: "Lowest price" },
            { key: "shortest", label: "Shortest ride" },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center gap-2">
              <input
                type="radio"
                name="sort"
                checked={sortBy === opt.key}
                onChange={() => setSortBy(opt.key)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* TIME FILTER */}
      <div>
        <h3 className="font-semibold mb-3">Departure time</h3>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={timeFilters.noonToEvening}
            onChange={(e) =>
              setTimeFilters((p) => ({
                ...p,
                noonToEvening: e.target.checked,
              }))
            }
          />
          12:00 – 18:00
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={timeFilters.afterEvening}
            onChange={(e) =>
              setTimeFilters((p) => ({
                ...p,
                afterEvening: e.target.checked,
              }))
            }
          />
          After 18:00
        </label>
      </div>

      {/* TRUST */}
      <div>
        <h3 className="font-semibold mb-3">Trust & safety</h3>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
          />
          Verified profile
        </label>
      </div>
    </div>
  );
}

export default FiltersSidebar;
