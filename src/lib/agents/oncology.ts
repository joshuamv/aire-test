import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ question: z.string() });
const output = z.object({ answer: z.string().optional() });

export const oncologySpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "oncology",
  version: "0.1.0",
  label: "Descriptives",
  purpose: "Oncology expertise.",
  input,
  output,
  systemPrompt: "You are an oncology expert.",
};


