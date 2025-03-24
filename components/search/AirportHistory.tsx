import { useAirportStore } from "@/store/airportStore";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AirportHistory() {
  const { searchHistory, setSelectedAirport, clearSearchHistory } =
    useAirportStore();

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Vistos recientemente
        </h2>
        <button
          onClick={clearSearchHistory}
          className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          Borrar historial
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchHistory.map((airport, index) => (
          <motion.div
            key={"images" + index}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Link
              href={`/airport/${airport.iata_code}`}
              onClick={() => setSelectedAirport(airport)}
              className="block"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {airport.airport_name}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {airport.city_name}, {airport.country_name}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {airport.iata_code}/{airport.icao_code}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
        <div className="flex  items-center justify-center">
          <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            {searchHistory.length} aeropuertos
          </span>
        </div>
      </div>
    </div>
  );
}

const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};
