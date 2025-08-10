import type { ChatCompletionParams, LlmProvider, LlmSettings, StreamChunk } from "@/lib/llm/types";

export const openaiProvider: LlmProvider = {
  id: "openai",
  name: "OpenAI",
  async *streamChat(_params: ChatCompletionParams, _settings: LlmSettings): AsyncGenerator<StreamChunk> {
    // Placeholder: real streaming integration to be added later
    yield { content: "", done: true };
  },
};


