import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ definition: z.string() });
const output = z.object({ cohortSize: z.number().optional() });

export const populationBuilderSpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "population_builder",
  version: "0.1.0",
  label: "Population",
  purpose: "Define and build patient cohorts.",
  input,
  output,
  systemPrompt: "You construct population definitions and return metrics.",
};


