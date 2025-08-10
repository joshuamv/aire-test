import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ question: z.string() });
const output = z.object({ answer: z.string().optional() });

export const endocrinologySpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "endocrinology",
  version: "0.1.0",
  label: "Methodology",
  purpose: "Endocrinology expertise (e.g., diabetes).",
  input,
  output,
  systemPrompt: "You are an endocrinology expert.",
};


