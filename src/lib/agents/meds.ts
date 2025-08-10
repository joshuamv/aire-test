import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ query: z.string() });
const output = z.object({ interaction: z.string().optional() });

export const medsSpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "meds",
  version: "0.1.0",
  label: "Hypothesis",
  purpose: "Medication guidance and interactions.",
  input,
  output,
  systemPrompt: "You provide medication insights and safety.",
};


