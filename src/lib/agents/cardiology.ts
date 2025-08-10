import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ question: z.string() });
const output = z.object({ answer: z.string().optional() });

export const cardiologySpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "cardiology",
  version: "0.1.0",
  label: "Design",
  purpose: "Cardiology expertise.",
  input,
  output,
  systemPrompt: "You are a cardiology expert.",
};


