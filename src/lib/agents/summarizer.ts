import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ text: z.string() });
const output = z.object({ summary: z.string() });

export const summarizerSpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "summarizer",
  version: "0.1.0",
  label: "Summary",
  purpose: "Summarize input text.",
  input,
  output,
  systemPrompt: "You write a concise summary.",
};


