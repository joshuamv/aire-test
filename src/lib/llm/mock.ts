import type { ChatCompletionParams, LlmProvider, LlmSettings, StreamChunk } from "@/lib/llm/types";

export const mockProvider: LlmProvider = {
  id: "mock",
  name: "Mock",
  async *streamChat(params: ChatCompletionParams, _settings: LlmSettings): AsyncGenerator<StreamChunk> {
    const last = params.messages[params.messages.length - 1];
    const text = last?.content ?? "";
    const chunks = [
      `You said: ${text.slice(0, Math.ceil(text.length / 3))}`,
      text.slice(Math.ceil(text.length / 3), Math.ceil((2 * text.length) / 3)),
      text.slice(Math.ceil((2 * text.length) / 3)),
    ].filter(Boolean);
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((r) => setTimeout(r, 5));
      yield { content: chunks[i] };
    }
    yield { content: "", done: true };
  },
};


