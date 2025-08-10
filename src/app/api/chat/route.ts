import { NextResponse } from "next/server";
import { z } from "zod";
import { routePrompt } from "@/lib/routing";
import type { ChatMessage } from "@/lib/types";

const BodySchema = z.object({ prompt: z.string().min(1) });

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const decision = routePrompt(parsed.data.prompt);
  // stub assistant message
  const message: ChatMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: `Stub reply for: "${parsed.data.prompt}"`,
    createdAt: new Date().toISOString(),
    agentName: decision.agents[0]?.name,
    agentRisk: decision.agents[0]?.riskTier,
    routing: decision,
  };
  return NextResponse.json({ message });
}


