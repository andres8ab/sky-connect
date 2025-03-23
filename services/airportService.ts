import axios from "axios";
import { AirportResponse } from "@/types/airport";

const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
const BASE_URL = "http://api.aviationstack.com/v1";

export const airportService = {
  async getAirports(
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ): Promise<AirportResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/airports`, {
        params: {
          access_key: API_KEY,
          limit,
          offset: (page - 1) * limit,
          search,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.message || "Failed to fetch airports"
        );
      }
      throw error;
    }
  },

  async getAirportByCode(query: string): Promise<AirportResponse> {
    try {
      if (!query || query.length < 2) {
        return {
          pagination: { limit: 0, offset: 0, count: 0, total: 0 },
          data: [],
        };
      }

      const response = await axios.get(`${BASE_URL}/airports`, {
        params: {
          access_key: API_KEY,
          search: query,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.message || "Failed to search airports"
        );
      }
      throw error;
    }
  },
};
