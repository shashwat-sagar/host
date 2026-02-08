// hooks/useSearch.ts

import { useState, useMemo, ChangeEvent } from "react";

export const useSearch = (initialData: any[] | undefined) => {
  // State to hold the current search query
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (!initialData) return [];
    if (!searchText) return initialData;

    const lowercasedQuery = searchText.toLowerCase();

    return initialData.filter((item) =>
      Object.values(item).some((field) =>
        // Safely convert each value to a string and check for inclusion
        String(field ?? "")
          ?.toLowerCase()
          ?.includes(lowercasedQuery)
      )
    );
  }, [initialData, searchText]); // Dependencies array

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target?.value);
  };

  return {
    searchText, // The current search term
    handleSearch, // Handler for input's onChange
    setSearchText, // Function to set search term programmatically
    filteredData, // The resulting filtered array
  };
};

// use
//   const { searchText, handleSearch, filteredData } = useSearch(users);
