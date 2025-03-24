import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Contact from "@/app/contact/page";

describe("Contact", () => {
  it("should have Testimonios text", () => {
    const { container } = render(<Contact />);

    const myElement = screen.getByText("Testimonios");
    expect(myElement).toBeInTheDocument();

    // Snapshot of the component
    expect(container).toMatchSnapshot();
  });

  it("should have text 'mensaje'", () => {
    render(<Contact />);

    const myElement = screen.getByText(/mensaje/i);

    expect(myElement).toBeInTheDocument();
  });

  it("should have a button", () => {
    render(<Contact />);

    const myElement = screen.getByRole("button", { name: "Enviar" });

    expect(myElement).toBeInTheDocument();
  });
});
