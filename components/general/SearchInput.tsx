import { useState } from "react";
import { useAirportStore } from "@/store/airportStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import icons from "@/constants/icons";

export default function SearchInput({ isHome }: { isHome: boolean }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    searchQueryHistory,
    addToSearchHistory,
    clearSearchHistory,
  } = useAirportStore();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedQuery = searchQuery.trim();

    // Clear any previous error message
    setErrorMessage("");

    // Check if search query is empty
    if (!trimmedQuery) {
      setErrorMessage("Por favor, ingrese un término de búsqueda");
      return;
    }

    setIsLoading(true);
    setTimeout(() => setIsOpen(false), 200);
    setCurrentPage(1);

    // Simulate a delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addToSearchHistory(trimmedQuery);
    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);

    setIsLoading(false);
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    setErrorMessage("");
    setCurrentPage(1);
    router.push(`/search`);
  };

  return (
    <div
      className={`flex gap-6 items-center justify-center ${
        isHome ? "flex-col" : "lg:flex-row flex-col"
      }`}
    >
      <div className="relative lg:w-[40vw] md:w-[50vw] w-[80vw]">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Clear error message when user starts typing
                if (errorMessage) setErrorMessage("");
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              placeholder="Buscar aeropuertos..."
              className="w-full px-4 py-3 
              text-[#0060FF] 
               placeholder:text-[#0060FF]/90 
              bg-white dark:bg-gray-800 
              border border-gray-300 dark:border-gray-700 
              rounded-full 
              focus:outline-none 
              focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearchQuery}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400 dark:text-gray-600 cursor-pointer 
                  hover:text-gray-600 dark:hover:text-gray-400 
                  transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 w-full px-4 py-2 
              bg-red-100 dark:bg-red-900 z-10
              text-red-700 dark:text-red-200 
              rounded-lg 
              text-sm text-center"
          >
            {errorMessage}
          </motion.div>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto"
            >
              <div className="p-2">
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
      <div className="relative">
        <button
          onClick={() => handleSearch()}
          disabled={isLoading}
          className={`
            border w-44 h-10 cursor-pointer hover:scale-105 hover:transition hover:duration-300 shadow-xs shadow-blue-50/30
            border-gray-100 dark:border-gray-600 dark:border-opacity-50 
            bg-gradient-to-r from-[#006AFF]/80 to-[#00F9FF]/80 
            text-white flex gap-3 pl-5 rounded-lg items-center 
            group/modal-btn 
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <Image
                src={icons.searchIcon}
                alt="search"
                width={22}
                height={22}
                className="opacity-80"
              />
              Buscar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
