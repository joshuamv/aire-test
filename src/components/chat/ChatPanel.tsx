"use client";
import * as React from "react";
import { MessageList, type ChatMessage } from "@/components/chat/MessageList";
import { Composer } from "@/components/chat/Composer";
import { AgentBar } from "@/components/agents/AgentBar";
import { ReasoningDrawer } from "@/components/reasoning/ReasoningDrawer";
import type { RoutingDecision } from "@/lib/types";
import { useRoutingStore } from "@/lib/stores";

type ChatPanelProps = {
  initialMessages?: ChatMessage[];
  hasPHIConsent?: boolean;
};

export function ChatPanel({ initialMessages = [], hasPHIConsent = true }: ChatPanelProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const showReasoning = useRoutingStore((s) => s.showReasoning);
  const setShowReasoning = useRoutingStore((s) => s.setShowReasoning);
  const alwaysShow = useRoutingStore((s) => s.alwaysShowReasoning);

  function handleSend() {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);
    // call chat API stub
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: newMsg.content }),
    })
      .then((r) => r.json())
      .then((data) => {
        const assistant = data?.message as ChatMessage | undefined;
        if (assistant) {
          setMessages((prev) => [...prev, assistant]);
          if (alwaysShow) setShowReasoning(true);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }

  // mock routing data for the latest assistant message
  const mockDecision: RoutingDecision = {
    rationale:
      "The query mentions diabetes management and medication interactions, so the system prioritized the Endocrinology and Meds agents.",
    agents: [
      { name: "Endocrinology", score: 0.91, reasons: ["mentions diabetes", "HbA1c context"], riskTier: "low" },
      { name: "Meds", score: 0.76, reasons: ["drug interaction", "dosage guidance"], riskTier: "medium" },
    ],
    features: { keywords: ["diabetes", "A1C"], entities: ["metformin"], flags: ["PHI_sensitive"] },
  };

  const latestAssistantIndex = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const hasAssistant = latestAssistantIndex !== -1;

  return (
    <div className="flex w-full flex-col gap-4">
      {!hasPHIConsent && (
        <div role="region" aria-label="PHI notice" className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          Sharing PHI requires consent. Please review settings.
        </div>
      )}

      <MessageList messages={messages} isLoading={isLoading} />
      {hasAssistant ? (
        <div className="flex items-center justify-between">
          <AgentBar
            agents={mockDecision.agents.map((a) => ({
              name: a.name,
              riskTier: a.riskTier,
              id: (a.id as any) ?? "fallback",
            }))}
          />
          <ReasoningDrawer decision={mockDecision} open={showReasoning} onOpenChange={setShowReasoning} />
        </div>
      ) : null}
      <Composer value={input} onChange={setInput} onSend={handleSend} onQuickAction={() => {}} />
    </div>
  );
}


