import Link from "next/link";
import React from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  ChartBarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { AdditionalData, Airport } from "@/types/airport";
import { Tabs } from "@/components/ui/tabs";
import ReactCountryFlag from "react-country-flag";
const AirportMap = dynamic(() => import("@/components/details/AirportMap"), {
  ssr: false,
});

interface DetailsPageProps {
  airport: Airport;
  additionalData?: AdditionalData;
  formatLocalTime: (date: Date | null) => string;
  localTime: Date | null;
  isLoadingAdditional: boolean;
}

const DetailsPage: React.FC<DetailsPageProps> = ({
  airport,
  additionalData,
  formatLocalTime,
  localTime,
  isLoadingAdditional,
}) => {
  const GeneralContent = () => {
    return (
      <div className="flex justify-between">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-800">Código IATA</h2>
            <p className="mt-1 text-lg text-white">{airport.iata_code}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-800">Código ICAO</h2>
            <p className="mt-1 text-lg text-white">
              {airport.icao_code || additionalData?.icao || "No disponible"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-800">País</h2>
            <p className="mt-1 text-lg text-white">
              {airport.country_name ||
                additionalData?.country_code ||
                "No disponible"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-800">Ciudad IATA</h2>
            <p className="mt-1 text-lg text-white">
              {airport.city_iata_code ||
                additionalData?.city_code ||
                "No disponible"}
            </p>
          </div>
          {additionalData?.region_name && (
            <div>
              <h2 className="text-sm font-medium text-gray-800">Región</h2>
              <p className="mt-1 text-lg text-white">
                {additionalData.region_name}
              </p>
            </div>
          )}
          <div>
            <h2 className="text-sm font-medium text-gray-800">Teléfono</h2>
            <p className="mt-1 text-lg text-white">
              {airport.phone_number || additionalData?.phone || "No disponible"}
            </p>
          </div>
          {additionalData?.email && (
            <div>
              <h2 className="text-sm font-medium text-gray-800">Email</h2>
              <p className="mt-1 text-lg text-white">{additionalData.email}</p>
            </div>
          )}
        </div>
        <ReactCountryFlag
          countryCode={airport?.country_iso2}
          svg
          style={{
            width: "2.5em",
            height: "1.5em",
            borderRadius: "5%",
            objectFit: "cover",
          }}
          title={airport?.country_iso2}
        />
      </div>
    );
  };

  const LocationContent = () => {
    return (
      <div className="space-y-4 min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-medium text-gray-800">Latitud</h2>
            <p className="mt-1 text-lg text-white">
              {airport.latitude || additionalData?.latitude || "No disponible"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-800">Longitud</h2>
            <p className="mt-1 text-lg text-white">
              {airport.longitude ||
                additionalData?.longitude ||
                "No disponible"}
            </p>
          </div>
          {additionalData?.elevation_ft && (
            <div>
              <h2 className="text-sm font-medium text-gray-800">
                Elevación (pies)
              </h2>
              <p className="mt-1 text-lg text-white">
                {additionalData.elevation_ft}
              </p>
            </div>
          )}
          <div>
            <h2 className="text-sm font-medium text-gray-800">ID Geoname</h2>
            <p className="mt-1 text-lg text-white">
              {airport.geoname_id || "No disponible"}
            </p>
          </div>
        </div>
        <div className="mt-6 min-h-[60vh]">
          <AirportMap airport={airport} />
        </div>
      </div>
    );
  };

  const ZoneContent = () => {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-800">Zona Horaria</h2>
          <p className="mt-1 text-lg text-white">
            {airport.timezone || additionalData?.time || "No disponible"}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-800">GMT</h2>
          <p className="mt-1 text-lg text-white">
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
      </div>
    );
  };

  const StatsContent = () => {
    return (
      <div className="space-y-4">
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
      </div>
    );
  };

  const LinksContent = () => {
    return (
      <div className="space-y-6">
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
      </div>
    );
  };

  const tabs = [
    {
      title: "General",
      value: "general",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white background-gradient">
          <GeneralContent />
        </div>
      ),
    },
    {
      title: "Ubicación",
      value: "ubicacion",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white background-gradient">
          <LocationContent />
        </div>
      ),
    },
    {
      title: "Zona Horaria",
      value: "zonahoraria",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white background-gradient">
          <ZoneContent />
        </div>
      ),
    },
    {
      title: "Estadísticas",
      value: "estadisticas",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white background-gradient">
          <StatsContent />
        </div>
      ),
    },
    {
      title: "Enlaces",
      value: "enlaces",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white background-gradient">
          <LinksContent />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[120vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[12vh]">
        <div className="bg-blue-100 dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <Link
              href="/search"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Regresar
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {airport.airport_name || additionalData?.airport || "Aeropuerto"}
            </h1>

            {/* Tabs */}

            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
