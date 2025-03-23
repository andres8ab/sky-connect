"use client";

import { useQuery } from "@tanstack/react-query";
import { useAirportStore } from "@/store/airportStore";
import { airportService } from "@/services/airportService";
import AirportTable from "@/components/AirportTable";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import { SearchModal } from "@/components/SearchModal";

export default function Search() {
  const { currentPage, setTotalPages } = useAirportStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["airports", currentPage],
    queryFn: async () => {
      const response = await airportService.getAirports(currentPage, 10);

      // Update total pages in the store
      setTotalPages(
        Math.ceil(response.pagination.total / response.pagination.limit)
      );

      return response.data;
    },
    // Refetching options
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 mt-[12vh] sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-[12vh]">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">
              {error instanceof Error
                ? error.message
                : "Failed to fetch airports"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[12vh] ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6 flex md:flex-row flex-col items-center gap-3 justify-between px-8">
              <div className="text-2xl lg:text-4xl font-bold z-10 text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text">
                SkyConnect Explorer
              </div>
              <SearchModal />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <>
                <AirportTable airports={data || []} />
                <Pagination />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
