"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  MapIcon,
  InformationCircleIcon,
  ChartBarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { useAirportStore } from "@/store/airportStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { airportService } from "@/services/airportService";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import airportData from "airport-data-js";

const AirportMap = dynamic(() => import("@/components/AirportMap"), {
  ssr: false,
});

const tabs = [
  { id: "general", label: "General", Icon: InformationCircleIcon },
  { id: "ubicacion", label: "Ubicación", Icon: MapIcon },
  { id: "zonahoraria", label: "Zona Horaria", Icon: ClockIcon },
  { id: "estadisticas", label: "Estadísticas", Icon: ChartBarIcon },
  { id: "enlaces", label: "Enlaces", Icon: LinkIcon },
];

const TabButton = ({
  id,
  label,
  Icon,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    key={id}
    onClick={onClick}
    className={`pb-4 px-1 inline-flex items-center border-b-2 font-medium text-sm cursor-pointer ${
      isActive
        ? "border-blue-500 text-blue-600 dark:text-blue-400"
        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 relative after:block after:content-[''] after:w-full after:h-[3px] after:bg-gray-300 after:absolute after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-0"
    } `}
  >
    <Icon className="h-5 w-5 md:mr-2" />
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default function AirportDetails() {
  const params = useParams();
  const code = params.code as string;

  const { searchHistory } = useAirportStore();

  const [activeTab, setActiveTab] = useState("general");
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

  const TabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Código IATA
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.iata_code}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Código ICAO
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.icao_code || additionalData?.icao || "No disponible"}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                País
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.country_name ||
                  additionalData?.country_code ||
                  "No disponible"}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ciudad IATA
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.city_iata_code ||
                  additionalData?.city_code ||
                  "No disponible"}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Teléfono
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.phone_number ||
                  additionalData?.phone ||
                  "No disponible"}
              </p>
            </div>
            {additionalData?.email && (
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </h2>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {additionalData.email}
                </p>
              </div>
            )}
          </motion.div>
        );
      case "ubicacion":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Latitud
                </h2>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {airport.latitude ||
                    additionalData?.latitude ||
                    "No disponible"}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Longitud
                </h2>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {airport.longitude ||
                    additionalData?.longitude ||
                    "No disponible"}
                </p>
              </div>
              {additionalData?.elevation_ft && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Elevación (pies)
                  </h2>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {additionalData.elevation_ft}
                  </p>
                </div>
              )}
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ID Geoname
                </h2>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {airport.geoname_id || "No disponible"}
                </p>
              </div>
              {additionalData?.region_name && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Región
                  </h2>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {additionalData.region_name}
                  </p>
                </div>
              )}
              {additionalData?.state && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Estado/Provincia
                  </h2>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {additionalData.state}
                  </p>
                </div>
              )}
              {additionalData?.county && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Condado/Municipio
                  </h2>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {additionalData.county}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <AirportMap airport={airport} />
            </div>
          </motion.div>
        );
      case "zonahoraria":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Zona Horaria
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.timezone || additionalData?.time || "No disponible"}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                GMT
              </h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {airport.gmt || "No disponible"}
              </p>
            </div>
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Hora local actual
              </h2>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {formatLocalTime(localTime)}
                </p>
              </div>
            </div>
          </motion.div>
        );
      case "estadisticas":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <ChartBarIcon className="h-12 w-12 text-blue-500" />
              </div>

              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4 text-center">
                Información Detallada
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ID Aeropuerto
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {airport.airport_id || "No disponible"}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ID Base de Datos
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {airport.id || "No disponible"}
                  </p>
                </div>
                {additionalData?.type && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tipo de Aeropuerto
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {additionalData.type || "No especificado"}
                    </p>
                  </div>
                )}
                {additionalData?.continent && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Continente
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {additionalData.continent}
                    </p>
                  </div>
                )}
                {additionalData?.scheduled_service && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Servicio Programado
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {additionalData.scheduled_service || "No especificado"}
                    </p>
                  </div>
                )}
                {additionalData?.runway_length && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Longitud de Pista
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {additionalData.runway_length}
                    </p>
                  </div>
                )}
              </div>

              {!isLoadingAdditional && !additionalData && (
                <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
                  No hay datos adicionales disponibles para este aeropuerto.
                </p>
              )}

              {isLoadingAdditional && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </motion.div>
        );
      case "enlaces":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <LinkIcon className="h-12 w-12 text-blue-500" />
              </div>

              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4 text-center">
                Enlaces y Recursos
              </h2>

              <div className="grid grid-cols-1 gap-4 mt-6">
                {additionalData?.wikipedia_link && (
                  <a
                    href={additionalData.wikipedia_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600 dark:text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Wikipedia
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {additionalData.wikipedia_link}
                      </p>
                    </div>
                  </a>
                )}

                {additionalData?.flightradar24_url && (
                  <a
                    href={additionalData.flightradar24_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-600 dark:text-orange-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        FlightRadar24
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Ver tráfico aéreo en tiempo real
                      </p>
                    </div>
                  </a>
                )}

                {additionalData?.radarbox_url && (
                  <a
                    href={additionalData.radarbox_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600 dark:text-green-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        RadarBox
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Seguimiento de vuelos
                      </p>
                    </div>
                  </a>
                )}

                {additionalData?.flightaware_url && (
                  <a
                    href={additionalData.flightaware_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600 dark:text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        FlightAware
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Monitoreo de vuelos
                      </p>
                    </div>
                  </a>
                )}

                {!additionalData?.wikipedia_link &&
                  !additionalData?.flightradar24_url &&
                  !additionalData?.radarbox_url &&
                  !additionalData?.flightaware_url && (
                    <div className="text-center p-6">
                      <p className="text-gray-600 dark:text-gray-400">
                        No hay enlaces disponibles para este aeropuerto.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[120vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[12vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <Link
              href="/search"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Regresar
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {airport.airport_name || additionalData?.airport || "Aeropuerto"}
            </h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
              <nav className="flex justify-around">
                {tabs.map(({ id, label, Icon }) => (
                  <TabButton
                    key={id}
                    id={id}
                    label={label}
                    Icon={Icon}
                    isActive={activeTab === id}
                    onClick={() => setActiveTab(id)}
                  />
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              <TabContent />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
