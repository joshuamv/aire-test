import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ question: z.string() });
const output = z.object({ answer: z.string().optional() });

export const radiologySpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "radiology",
  version: "0.1.0",
  label: "Analytics",
  purpose: "Radiology expertise.",
  input,
  output,
  systemPrompt: "You are a radiology expert.",
};


