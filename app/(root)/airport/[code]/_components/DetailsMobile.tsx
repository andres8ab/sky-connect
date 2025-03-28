import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  ChartBarIcon,
  LinkIcon,
  InformationCircleIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { AdditionalData, Airport } from "@/types/airport";
import images from "@/constants/images";
import icons from "@/constants/icons";
import GeneralInfoCard from "./GeneralInfoCard";
const AirportMap = dynamic(() => import("@/components/details/AirportMap"), {
  ssr: false,
});

interface DetailsPageProps {
  airport: Airport;
  additionalData?: AdditionalData;
  localTime: Date | null;
  isLoadingAdditional: boolean;
}

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
    className={`p-1.5 inline-flex text-xs w-full justify-center rounded items-center font-medium cursor-pointer ${
      isActive
        ? "bg-blue-600 text-blue-50"
        : "border-transparent text-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 relative after:block after:content-[''] after:w-full after:h-[3px] after:bg-gray-300 after:absolute after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-0"
    } `}
  >
    <Icon className="h-5 w-5 md:mr-2" />
    <span className="hidden md:inline">{label}</span>
  </button>
);

const DetailsMobile: React.FC<DetailsPageProps> = ({
  airport,
  additionalData,
  localTime,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  const TabContent = () => {
    switch (activeTab) {
      case "general":
        const generalInfoItems = [
          {
            label: "Código IATA",
            value: airport.city_iata_code || additionalData?.city_code,
          },
          {
            label: "Código ICAO",
            value: airport.icao_code || additionalData?.icao,
          },
          {
            label: "País",
            value: airport.country_name || additionalData?.country_code,
          },
          {
            label: "Región",
            value: additionalData?.region_name,
            show: !!additionalData?.region_name,
          },
          {
            label: "Teléfono",
            value: airport.phone_number || additionalData?.phone,
          },
          {
            label: "Email",
            value: additionalData?.email,
            show: !!additionalData?.email,
          },
        ];
        return (
          <GeneralInfoCard
            backgroundImageSrc={images.airplaneImage.src}
            iconSrc={icons.generalIcon}
            title="Información General"
            items={generalInfoItems}
          />
        );
      case "ubicacion":
        const locationInfoItems = [
          {
            label: "Latitud",
            value: airport.latitude
              ? String(airport.latitude)
              : additionalData?.latitude,
          },
          {
            label: "Longitud",
            value: airport.longitude
              ? String(airport.longitude)
              : additionalData?.longitude,
          },
          {
            label: "ID Geoname",
            value: airport.geoname_id,
          },
          {
            label: "Elevación",
            value: additionalData?.elevation_ft
              ? String(additionalData.elevation_ft)
              : null,
            show: !!additionalData?.elevation_ft,
          },
        ];
        return (
          <div className="flex flex-col">
            <GeneralInfoCard
              backgroundImageSrc={images.airplaneImage.src}
              iconSrc={icons.locationIcon}
              title="Ubicación"
              items={locationInfoItems}
            />
            <div className="my-6">
              <AirportMap airport={airport} />
            </div>
          </div>
        );
      case "zonahoraria":
        const formatLocalTime = (date: Date | null): string => {
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

        const globeInfoItems = [
          {
            label: "Zona Horaria",
            value: airport.timezone || additionalData?.time,
          },
          {
            label: "GMT",
            value: airport.gmt || "No disponible",
          },
        ];
        const timeInfoItems = [
          {
            label: "",
            value: formatLocalTime(localTime),
          },
        ];
        return (
          <div className="flex flex-col gap-5">
            <GeneralInfoCard
              backgroundImageSrc={images.airplaneImage.src}
              iconSrc={icons.globeIcon}
              title="Zona Horaria"
              items={globeInfoItems}
            />
            <GeneralInfoCard
              backgroundImageSrc={images.airplaneImage.src}
              iconSrc={icons.timeIcon}
              title="Hora Local"
              items={timeInfoItems}
            />
          </div>
        );
      case "estadisticas":
        const statsInfoItems = [
          {
            label: "ID Aeropuerto",
            value: airport.airport_id ? String(airport.airport_id) : null,
          },
          {
            label: "ID Base de Datos",
            value: airport.id ? String(airport.id) : null,
          },
          {
            label: "Tipo de Aeropuerto",
            value: additionalData?.type || null,
            show: !!additionalData?.type,
          },
          {
            label: "Servicio Programado",
            value: additionalData?.scheduled_service || null,
            show: !!additionalData?.scheduled_service,
          },
          {
            label: "Longitud de pista",
            value: additionalData?.runway_length
              ? String(additionalData.runway_length)
              : null,
            show: !!additionalData?.runway_length,
          },
          {
            label: "Continente",
            value: additionalData?.continent || null,
            show: !!additionalData?.continent,
          },
        ];
        return (
          <GeneralInfoCard
            backgroundImageSrc={images.airplaneImage.src}
            iconSrc={icons.statsIcon}
            title="Estadisticas y Detalles"
            items={statsInfoItems}
          />
        );
      case "enlaces":
        return (
          <div className="relative border border-gray-400 rounded p-2">
            <div
              className="absolute right-0 opacity-40 top-0 bottom-0 w-1/2 bg-cover bg-center z-[-1]"
              style={{
                backgroundImage: `url(${images.airplaneImage.src})`,
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full bg-gradient-to-b from-[#3F495F] to-[#0E1934] opacity-70 z-[-1]" />
            <div className="flex items-center gap-2 my-2 pl-5">
              <LinkIcon className="h-7 w-7 text-white" />
              <h1 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 bg-clip-text">
                Enlaces y Recursos
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6">
              {additionalData?.wikipedia_link && (
                <a
                  href={additionalData.wikipedia_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" p-4 rounded-lg shadow hover:bg-gray-700 transition-colors flex items-center"
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
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Wikipedia
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
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
                  className="p-4 rounded-lg shadow hover:bg-gray-700 transition-colors flex items-center"
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
                  className="p-4 rounded-lg shadow hover:bg-gray-700 transition-colors flex items-center"
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
                  className="p-4 rounded-lg shadow hover:bg-gray-700 transition-colors flex items-center"
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[120vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[12vh]">
        <div className="px-4 py-5 sm:p-6">
          <Link
            href="/search"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Regresar
          </Link>

          <h1 className="text-3xl mb-6 font-extrabold text-center text-transparent bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 bg-clip-text">
            {airport.airport_name || additionalData?.airport || "Aeropuerto"}
          </h1>

          {/* Tabs */}
          <div className="bg-[#3F495F]/80 p-1 rounded overflow-x-auto">
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
      </div>
    </div>
  );
};

export default DetailsMobile;
