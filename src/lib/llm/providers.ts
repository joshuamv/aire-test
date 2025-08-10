import type { LlmProvider } from "@/lib/llm/types";
import { mockProvider } from "@/lib/llm/mock";
import { openaiProvider } from "@/lib/llm/openai";

export const PROVIDERS: Record<string, LlmProvider> = {
  mock: mockProvider,
  openai: openaiProvider,
};

export function getProvider(id: string | undefined): LlmProvider {
  if (!id) return mockProvider;
  return PROVIDERS[id] ?? mockProvider;
}


