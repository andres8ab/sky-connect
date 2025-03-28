import { useAirportStore } from "@/store/airportStore";
import { motion } from "framer-motion";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useAirportStore();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const maxVisiblePages = 5; // Maximum number of page buttons to show at once
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(currentPage + 1, totalPages - 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis1");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis2");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-4 py-4 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex flex-1 flex-col sm:hidden gap-2">
        <div className="flex flex-1 justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-blue-200 text-blue-700 dark:bg-[#0060FF] dark:text-blue-200 hover:bg-blue-800 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 dark:bg-[#0060FF] dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
        <div>
          <p className="text-sm text-gray-300 dark:text-gray-300">
            Mostrando página <span className="font-medium">{currentPage}</span>{" "}
            de <span className="font-medium">{totalPages}</span>
          </p>
        </div>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 flex-col sm:items-center sm:justify-between">
        <div className="self-start">
          <p className="text-sm text-gray-300 dark:text-gray-300">
            Mostrando página <span className="font-medium">{currentPage}</span>{" "}
            de <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md space-x-3"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center justify-center w-24 h-10 cursor-pointer rounded-xl bg-[#0060FF] text-blue-200 dark:bg-[#0060FF] font-bold text-sm dark:text-blue-200 hover:bg-blue-800 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              Anterior
              {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            </motion.button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis1" || page === "ellipsis2") {
                return (
                  <span
                    key={`${page}-${index}`}
                    className="relative inline-flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(page as number)}
                  className={`relative inline-flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#00F9FF] text-blue-700 dark:bg-[#00F9FF] dark:text-black dark:font-bold font-bold"
                      : "bg-[#0060FF] text-blue-200 dark:bg-[#0060FF] dark:text-blue-200 hover:bg-blue-800 dark:hover:bg-blue-800"
                  }`}
                >
                  {page}
                </motion.button>
              );
            })}

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center cursor-pointer justify-center w-24 h-10 rounded-xl bg-[#0060FF] text-blue-200 dark:bg-[#0060FF] font-bold text-sm dark:text-blue-200 hover:bg-blue-800 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
              Siguiente
            </motion.button>
          </nav>
        </div>
      </div>
    </div>
  );
}
