import AirportHistory from "@/components/search/AirportHistory";
import { useAirportStore } from "@/store/airportStore";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@/store/airportStore");

describe("AirportHistory", () => {
  beforeEach(() => {
    (useAirportStore as unknown as jest.Mock).mockReturnValue({
      searchHistory: [
        {
          airport_name: "Los Angeles International",
          city_name: "Los Angeles",
          country_name: "USA",
          iata_code: "LAX",
          icao_code: "KLAX",
        },
      ],
      setSelectedAirport: jest.fn(),
      clearSearchHistory: jest.fn(),
    });
  });

  it("should display 'Vistos recientemente'", () => {
    render(<AirportHistory />);
    expect(screen.getByText("Vistos recientemente")).toBeInTheDocument();
  });

  it("should have a 'Borrar historial' button", () => {
    render(<AirportHistory />);
    expect(
      screen.getByRole("button", { name: "Borrar historial" })
    ).toBeInTheDocument();
  });
});
