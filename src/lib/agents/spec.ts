import { z } from "zod";

export type AgentSpec<TIn = unknown, TOut = unknown> = {
  id: string;
  version: string;
  label: string;
  purpose: string;
  input: z.ZodType<TIn>;
  output: z.ZodType<TOut>;
  systemPrompt: string;
};


