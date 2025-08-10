"use client";
import * as React from "react";
import type { AgentId, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

function agentToClass(agentId?: AgentId) {
  if (!agentId) return "chat-gradient-neutral";
  return `chat-gradient-${agentId}`;
}

export function ChatBackground({ messages }: { messages: ChatMessage[] }) {
  const latestAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const routingId = (latestAssistant as any)?.routing?.agents?.[0]?.id as AgentId | undefined;
  return <div className={cn("chat-bg", agentToClass(routingId))} aria-hidden />;
}


