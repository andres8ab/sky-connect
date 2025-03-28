"use client";

import { useQuery } from "@tanstack/react-query";
import { useAirportStore } from "@/store/airportStore";
import { airportService } from "@/services/airportService";
import Pagination from "@/components/general/Pagination";
import AirportTable from "@/components/search/AirportTable";
import { useSearchParams } from "next/navigation";
import SearchInput from "../../../components/general/SearchInput";

export default function Search() {
  const { currentPage, setTotalPages } = useAirportStore();
  const params = useSearchParams();
  const query = params.get("query") || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["airports", currentPage, query],
    queryFn: async () => {
      const response = await airportService.getAirports(currentPage, 10, query);

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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-[12vh]">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">
              {error instanceof Error
                ? error.message
                : "Error al obtener los aeropuertos"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl flex flex-col mx-auto mt-[12vh]">
        <div className="mb-6 flex self-center items-center gap-3 justify-between px-8">
          {/* <SearchModal /> */}
          <SearchInput isHome={false} />
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
    </div>
  );
}
