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

export interface AdditionalData {
  icao?: string;
  country_code?: string;
  latitude?: string;
  longitude?: string;
  city_code?: string;
  region_name?: string;
  phone?: string;
  email?: string;
  type?: string;
  continent?: string;
  scheduled_service?: string;
  runway_length?: string;
  elevation_ft?: string;
  wikipedia_link?: string;
  flightradar24_url?: string;
  radarbox_url?: string;
  flightaware_url?: string;
  time?: string;
  airport?: string;
}

export type SearchHistory = Airport;
