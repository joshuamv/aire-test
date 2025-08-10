import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ variant: z.string() });
const output = z.object({ normalized: z.string().optional() });

export const genomicsSpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "genomics",
  version: "0.1.0",
  label: "Harmonization",
  purpose: "Normalize/annotate genomic variants.",
  input,
  output,
  systemPrompt: "You harmonize genomic variants to a canonical form.",
};


