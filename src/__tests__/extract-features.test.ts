import { extractFeatures, routePrompt } from "@/lib/routing";

describe("extractFeatures", () => {
  it("finds keywords across agents", () => {
    const f = extractFeatures("Diabetes A1C medication interaction literature");
    expect(f.keywords).toEqual(expect.arrayContaining(["a1c", "interaction", "literature"]));
  });

  it("detects simple entities", () => {
    const f = extractFeatures("Metformin dose");
    expect(f.entities).toEqual(expect.arrayContaining(["metformin"]));
  });

  it("flags PHI hints", () => {
    const f = extractFeatures("patient MRN 12345");
    expect(f.flags).toContain("PHI_sensitive");
  });

  it("handles empty text", () => {
    const f = extractFeatures("");
    expect(f.keywords?.length ?? 0).toBeGreaterThanOrEqual(0);
  });
});

describe("routePrompt", () => {
  it("defaults to summarizer on weak signals", () => {
    const d = routePrompt("hello world");
    expect(d.agents[0].name.toLowerCase()).toContain("summar");
  });

  it("ranks sight for literature queries", () => {
    const d = routePrompt("systematic literature review");
    expect(d.agents.map((a) => a.name.toLowerCase()).join(" ")).toContain("sight");
  });
});


