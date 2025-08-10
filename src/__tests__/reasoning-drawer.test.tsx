import { render, screen } from "@testing-library/react";
import { ReasoningDrawer } from "@/components/reasoning/ReasoningDrawer";

const decision = {
  rationale: "Because keywords matched",
  agents: [
    { id: "sight", name: "Sight", score: 0.8, reasons: ["literature"], riskTier: "low" },
    { id: "population_builder", name: "Population Builder", score: 0.6, reasons: ["population"], riskTier: "medium" },
  ],
  features: { keywords: ["literature", "population"], entities: ["metformin"], flags: [] },
};

describe("ReasoningDrawer", () => {
  it("renders rationale and agent table when open", () => {
    render(<ReasoningDrawer decision={decision} open onOpenChange={() => {}} />);
    // specifically assert on the dialog title instead of trigger text
    expect(screen.getByRole('heading', { name: /why this route\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Because keywords matched/i)).toBeInTheDocument();
    expect(screen.getByText(/Sight/)).toBeInTheDocument();
    expect(screen.getByText(/Population Builder/)).toBeInTheDocument();
  });
});


