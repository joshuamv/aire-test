import { NextResponse } from "next/server";
import { z } from "zod";
import { routePrompt } from "@/lib/routing";

const BodySchema = z.object({ prompt: z.string().min(1) });

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const decision = routePrompt(parsed.data.prompt);
  // TODO: emit ROUTING audit event (stubbed)
  // console.log({ type: "ROUTING", decision });
  return NextResponse.json(decision);
}


