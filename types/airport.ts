export interface Airport {
  id: number;
  iata_code: string;
  icao_code: string;
  airport_name: string;
  city_name: string;
  country_name: string;
  timezone: string;
  latitude: number;
  longitude: number;
  city_iata_code: string;
  country_iso2: string;
  phone_number: string;
  geoname_id: string;
  gmt: string;
  airport_id: string;
}

export interface AirportResponse {
  data: Airport[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

export interface SearchQueryHistory {
  query: string;
  timestamp: number;
}

export type SearchHistory = Airport;
