import { z } from "zod";

export const RoutingDecisionSchema = z.object({
  rationale: z.string(),
  agents: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        score: z.number().min(0).max(1),
        reasons: z.array(z.string()),
        riskTier: z.enum(["low", "medium", "high"]).optional(),
      }),
    )
    .min(1),
  features: z.object({
    keywords: z.array(z.string()).optional(),
    entities: z.array(z.string()).optional(),
    flags: z.array(z.string()).optional(),
  }),
});

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  createdAt: z.union([z.date(), z.string()]).optional(),
  agentName: z.string().optional(),
  agentRisk: z.enum(["low", "medium", "high"]).optional(),
  routing: RoutingDecisionSchema.optional(),
});

export type RoutingDecision = z.infer<typeof RoutingDecisionSchema>;
export type Message = z.infer<typeof MessageSchema>;


