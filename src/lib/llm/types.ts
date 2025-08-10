export type LlmProviderId = "mock" | "openai";

export type LlmSettings = {
  providerId: LlmProviderId;
  model: string;
  endpoint?: string;
};

export type LlmMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatCompletionParams = {
  messages: LlmMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

export type StreamChunk = {
  content: string;
  done?: boolean;
};

export interface LlmProvider {
  id: LlmProviderId;
  name: string;
  streamChat: (params: ChatCompletionParams, settings: LlmSettings) => AsyncGenerator<StreamChunk>;
}


