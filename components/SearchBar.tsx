import { useState, useEffect, useMemo } from "react";
import { useAirportStore } from "@/store/airportStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { airportService } from "@/services/airportService";
import { Airport } from "@/types/airport";
import { useRouter } from "next/navigation";

export default function AirportSearchBar() {
  const setSelectedAirport = useAirportStore(
    (state) => state.setSelectedAirport
  );

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingHistoryQuery, setPendingHistoryQuery] = useState<string | null>(
    null
  );
  const {
    searchQuery,
    setSearchQuery,
    searchQueryHistory,
    addToSearchHistory,
    clearSearchHistory,
  } = useAirportStore();

  // Use TanStack Query to fetch airports
  const {
    data: airportsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["airports", searchQuery],
    queryFn: () => airportService.getAirportByCode(searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  // Memoize airports
  const airports = useMemo(
    () => airportsResponse?.data || [],
    [airportsResponse]
  );

  // Effect to handle history item selection after data is loaded
  useEffect(() => {
    if (pendingHistoryQuery && !isLoading && airports.length > 0) {
      setSelectedAirport(airports[0]);
      router.push(`/airport/${airports[0].iata_code}`);
      setPendingHistoryQuery(null);
    }
  }, [pendingHistoryQuery, airports, isLoading, setSelectedAirport, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery);
    }
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    setPendingHistoryQuery(query);
  };

  const handleAirportSelect = (airport: Airport) => {
    setSelectedAirport(airport);
    addToSearchHistory(airport.airport_name);
    setIsOpen(false);
    router.push(`/airport/${airport.iata_code}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Buscar aeropuertos..."
          className="w-full px-4 py-2 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {/* Search Results */}
              {searchQuery.length >= 2 && (
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Results
                  </h3>

                  {isLoading && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-1">
                      Loading airports...
                    </p>
                  )}

                  {error && (
                    <p className="text-sm text-red-500 dark:text-red-400 py-1">
                      Error fetching airports. Please try again.
                    </p>
                  )}

                  {airports && airports.length === 0 && !isLoading && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-1">
                      No airports found.
                    </p>
                  )}

                  {airports && airports.length > 0 && (
                    <ul className="space-y-1">
                      {airports.map((airport) => (
                        <li key={airport.id}>
                          <button
                            onClick={() => handleAirportSelect(airport)}
                            className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {airport.airport_name}
                                {airport.iata_code && ` (${airport.iata_code})`}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {airport.icao_code}, {airport.country_name}
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Recent Searches */}
              {searchQueryHistory.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearSearchHistory}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {searchQueryHistory.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleHistoryClick(item.query)}
                          className="w-full text-left px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          {item.query}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
