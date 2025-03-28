import { Airport } from "@/types/airport";
import { Button } from "../ui/MovingBorders";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import images from "@/constants/images";

interface AirportTableProps {
  airports: Airport[];
}

export default function AirportTable({ airports }: AirportTableProps) {
  const [cityNames, setCityNames] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simple manual mapping or fallback
    const cityMap: Record<string, string> = {};

    airports.forEach((card) => {
      // Prioritize existing information
      if (card.city_name) {
        cityMap[card.city_iata_code] = card.city_name;
      } else {
        // Fallback to country name if no city name
        cityMap[card.city_iata_code] = card.country_name || "Unknown Location";
      }
    });

    setCityNames(cityMap);
  }, [airports]);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5">
        {airports.map((card) => {
          return (
            <Button
              data={card}
              key={card.id}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="0.5rem"
              style={{
                background: "rgb(14, 25, 52)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(63,73,95,1) 0%, rgba(14,25,52,1) 100%)",
                borderRadius: `calc(0.5rem * 0.96)`,
              }}
              className="flex-1 text-white dark:text-white border-slate-700 dark:border-gray-500 hover:border-[#0060FF] hover:outline-[#0060FF] hover:outline-2"
            >
              <div className="flex relative w-full justify-between p-3 gap-2">
                <div
                  className="absolute right-0 opacity-40 top-0 bottom-0 w-1/2 bg-cover bg-center z-[-1]"
                  style={{
                    backgroundImage: `url(${images.airplaneImage.src})`,
                  }}
                />
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-950 opacity-70 z-[-1]" />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-start font-bold">
                      Aeropuerto {card.airport_name}
                    </h1>
                    <p className="text-start text-white-100">
                      {cityNames[card.city_iata_code] || "Location Not Found"},{" "}
                      {card.country_name}
                    </p>
                  </div>
                  <p className="text-2xl lg:text-4xl font-extrabold uppercase my-4">
                    <span className="text-transparent bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-400 bg-clip-text">
                      {card?.country_name?.slice(0, 3) ||
                        cityNames[card.city_iata_code]?.slice(0, 3)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <Image
                    src="/assets/icons/flight.png"
                    alt="airport"
                    width={50}
                    height={50}
                    className="lg:w-10 w-8 self-start justify-self-end"
                  />
                  <ReactCountryFlag
                    countryCode={card?.country_iso2}
                    svg
                    style={{
                      width: "2.5em",
                      height: "1.5em",
                      borderRadius: "5%",
                      objectFit: "cover",
                      marginBottom: "0.5em",
                    }}
                    title={card?.country_iso2}
                  />
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
