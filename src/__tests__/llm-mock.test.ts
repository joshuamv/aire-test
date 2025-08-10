import { mockProvider } from "@/lib/llm/mock";

describe("mockProvider", () => {
  it("streams at least 3 chunks and ends with done", async () => {
    const chunks: string[] = [];
    let ended = false;
    for await (const part of mockProvider.streamChat({ messages: [{ role: "user", content: "abcdefghi" }] }, { providerId: "mock", model: "mock" })) {
      if (part.done) {
        ended = true;
      } else {
        chunks.push(part.content);
      }
    }
    expect(chunks.join("")).toContain("You said: abcdefghi".slice(0, 5));
    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(ended).toBe(true);
  });
});


