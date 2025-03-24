"use client";
import { useAirportStore } from "@/store/airportStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { airportService } from "@/services/airportService";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import airportData from "airport-data-js";
import DetailsPage from "@/app/airport/[code]/_components/DetailsPage";
import useIsMobile from "@/hooks/useIsMobile";
import DetailsMobile from "@/app/airport/[code]/_components/DetailsMobile";

export default function AirportDetails() {
  const params = useParams();
  const code = params.code as string;
  const isMobile = useIsMobile();
  const { searchHistory } = useAirportStore();
  const [localTime, setLocalTime] = useState<Date | null>(null);

  const {
    data: airportsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["airports", code],
    queryFn: () => airportService.getAirportByCode(code),
    enabled: code.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  const fetchedAirport = airportsResponse?.data?.find(
    (airport) => airport.iata_code === code
  );

  const historyMatch = searchHistory.find((item) => item.iata_code === code);

  const airport = fetchedAirport || historyMatch;

  // Fetch additional airport data
  const { data: additionalData, isLoading: isLoadingAdditional } = useQuery({
    queryKey: ["airportData", airport?.city_iata_code],
    queryFn: async () => {
      if (!airport?.city_iata_code) return null;
      const airportInfo = await airportData.getAirportByIata(
        airport.city_iata_code
      );
      return airportInfo && airportInfo.length > 0 ? airportInfo[0] : null;
    },
    enabled: !!airport?.city_iata_code,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!airport?.timezone) return;

    const updateLocalTime = () => setLocalTime(new Date());

    updateLocalTime();

    const intervalId = setInterval(updateLocalTime, 60000);

    return () => clearInterval(intervalId);
  }, [airport?.timezone]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-[12vh]">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">
              No se ha encontrado información del aeropuerto
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!airport) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-[12vh]">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">
              {"Airport not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatLocalTime = (date: Date | null) => {
    if (!date) return "Loading time...";
    return new Intl.DateTimeFormat("es", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: airport.timezone,
    }).format(date);
  };

  if (isMobile) {
    return (
      <DetailsMobile
        airport={airport}
        localTime={localTime}
        additionalData={additionalData}
        formatLocalTime={formatLocalTime}
        isLoadingAdditional={isLoadingAdditional}
      />
    );
  }

  return (
    <DetailsPage
      airport={airport}
      localTime={localTime}
      additionalData={additionalData}
      formatLocalTime={formatLocalTime}
      isLoadingAdditional={isLoadingAdditional}
    />
  );
}
