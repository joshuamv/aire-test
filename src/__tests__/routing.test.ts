import { routePrompt } from "@/lib/routing";

describe("routePrompt", () => {
  it("routes literature queries to Sight", () => {
    const d = routePrompt("Find literature about A1C systematic review");
    expect(d.agents[0].name.toLowerCase()).toContain("sight");
  });
  it("routes population queries to Population Builder", () => {
    const d = routePrompt("Build a cohort and analytics for diabetes population");
    expect(d.agents[0].name.toLowerCase()).toContain("population");
  });
  it("routes harmonization to Genomics", () => {
    const d = routePrompt("genomic variant harmonization workflow");
    expect(d.agents[0].name.toLowerCase()).toContain("genomic");
  });
  it("routes analytics to Population Builder", () => {
    const d = routePrompt("analytics incidence stratify by age");
    expect(d.agents[0].name.toLowerCase()).toContain("population");
  });
  it("routes summary to Summarizer", () => {
    const d = routePrompt("please summarize this long note");
    expect(d.agents[0].name.toLowerCase()).toContain("summar");
  });
});


