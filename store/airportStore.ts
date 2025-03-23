import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Airport, SearchHistory, SearchQueryHistory } from "@/types/airport";

interface AirportStore {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  searchHistory: SearchHistory[];
  searchQueryHistory: SearchQueryHistory[];
  darkMode: boolean;
  selectedAirport: Airport | null;
  setAirports: (airports: Airport[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  toggleDarkMode: () => void;
  setSelectedAirport: (airport: Airport | null) => void;
}

export const useAirportStore = create<AirportStore>()(
  persist(
    (set) => ({
      airports: [],
      loading: false,
      error: null,
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      searchHistory: [],
      searchQueryHistory: [],
      darkMode: false,
      selectedAirport: null,
      setAirports: (airports) => set({ airports }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setTotalPages: (total) => set({ totalPages: total }),
      addToSearchHistory: (query) =>
        set((state) => ({
          searchQueryHistory: [
            { query, timestamp: Date.now() },
            ...state.searchQueryHistory.slice(0, 4),
          ],
        })),
      clearSearchHistory: () =>
        set({ searchHistory: [], searchQueryHistory: [] }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSelectedAirport: (airport) =>
        set((state) => {
          if (!airport) return { selectedAirport: null };

          // Check if this airport is already in history to avoid duplicates
          const existingIndex = state.searchHistory.findIndex(
            (item) => item.iata_code === airport.iata_code
          );

          let updatedHistory = [...state.searchHistory];

          if (existingIndex !== -1) {
            // Remove the existing entry
            updatedHistory.splice(existingIndex, 1);
          }

          // Add the new airport to the beginning of history
          updatedHistory.unshift(airport);

          // Limit history to most recent 10 items
          if (updatedHistory.length > 10) {
            updatedHistory = updatedHistory.slice(0, 10);
          }

          return {
            selectedAirport: airport,
            searchHistory: updatedHistory,
          };
        }),
    }),
    {
      name: "airport-storage", // name of the item in localStorage
    }
  )
);
