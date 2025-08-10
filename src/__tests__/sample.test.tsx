import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders composer input", () => {
    render(<Home />);
    expect(screen.getByLabelText(/Message composer/i)).toBeInTheDocument();
  });
});


