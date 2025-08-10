import { AGENT_SPECS } from "@/lib/agents/index";
import { z } from "zod";

describe("agent specs registry", () => {
  it("registers all nine agents", () => {
    expect(Object.keys(AGENT_SPECS).sort()).toEqual(
      [
        "cardiology",
        "endocrinology",
        "genomics",
        "meds",
        "oncology",
        "population_builder",
        "radiology",
        "sight",
        "summarizer",
      ].sort(),
    );
  });

  it("schemas parse minimal examples", () => {
    for (const spec of Object.values(AGENT_SPECS)) {
      const minimalInput = (() => {
        switch (spec.id) {
          case "sight":
            return { query: "diabetes A1C" };
          case "population_builder":
            return { definition: "patients with diabetes" };
          case "genomics":
            return { variant: "BRCA1:c.68_69del" };
          case "summarizer":
            return { text: "long text" };
          case "meds":
            return { query: "metformin interactions" };
          case "endocrinology":
          case "cardiology":
          case "oncology":
          case "radiology":
            return { question: "What is..." };
          default:
            return {} as any;
        }
      })();
      expect(() => spec.input.parse(minimalInput)).not.toThrow();
    }
  });
});


