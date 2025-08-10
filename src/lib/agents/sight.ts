import { z } from "zod";
import type { AgentSpec } from "@/lib/agents/spec";

const input = z.object({ query: z.string() });
const output = z.object({ papers: z.array(z.object({ title: z.string() })).default([]) });

export const sightSpec: AgentSpec<z.infer<typeof input>, z.infer<typeof output>> = {
  id: "sight",
  version: "0.1.0",
  label: "Literature",
  purpose: "Retrieve and synthesize relevant literature.",
  input,
  output,
  systemPrompt: "You are a literature agent. Return relevant papers.",
};


