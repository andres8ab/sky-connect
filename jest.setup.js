import "@testing-library/jest-dom";

// Mock Leaflet
jest.mock("leaflet", () => ({
  map: jest.fn(),
  tileLayer: jest.fn(),
  marker: jest.fn(),
  icon: jest.fn(),
  popup: jest.fn(),
  setView: jest.fn(),
  addTo: jest.fn(),
  setLatLng: jest.fn(),
  bindPopup: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  remove: jest.fn(),
}));
