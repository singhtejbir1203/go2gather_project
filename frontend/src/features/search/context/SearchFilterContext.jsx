import { createContext, useContext, useState } from "react";

const SearchFilterContext = createContext(null);

export function SearchFilterProvider({ children }) {
  const [sortBy, setSortBy] = useState("earliest");
  const [timeFilters, setTimeFilters] = useState({
    noonToEvening: false,
    afterEvening: false,
  });
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <SearchFilterContext.Provider
      value={{
        sortBy,
        setSortBy,
        timeFilters,
        setTimeFilters,
        verifiedOnly,
        setVerifiedOnly,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export const useSearchFilters = () => useContext(SearchFilterContext);
