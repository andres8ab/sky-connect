import { Airport } from "@/types/airport";
import { Button } from "../ui/MovingBorders";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import airportData from "airport-data-js";
import { useEffect, useState } from "react";

interface AirportTableProps {
  airports: Airport[];
}

export default function AirportTable({ airports }: AirportTableProps) {
  const [cityNames, setCityNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCityNames = async () => {
      const cityMap: Record<string, string> = {};

      for (const card of airports) {
        try {
          const airportInfo = await airportData.getAirportByIata(
            card.city_iata_code
          );
          cityMap[card.city_iata_code] = airportInfo?.[0]?.city || "";
        } catch (error) {
          console.error("Error fetching city name:", error);
          cityMap[card.city_iata_code] = "";
        }
      }

      // console.log(cityMap);
      setCityNames(cityMap);
    };

    fetchCityNames();
  }, [airports]);
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5">
        {airports.map((card) => {
          const slicedCountryName = card?.country_name?.slice(0, 3);
          return (
            <Button
              data={card}
              key={card.id}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                borderRadius: `calc(1.75rem * 0.96)`,
              }}
              className="flex-1 text-white dark:text-white border-slate-700 dark:border-slate-800"
            >
              <div className="flex w-full justify-between p-3 py-6 md:p-5 lg:p-10 gap-2">
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.airport_name}
                  </h1>
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {cityNames[card.city_iata_code] || "Loading..."},{" "}
                    {card.country_name}
                  </p>
                  <p className="text-2xl lg:text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 bg-clip-text uppercase mt-3">
                    {slicedCountryName}
                  </p>
                </div>
                <div className="flex flex-col gap-5">
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
