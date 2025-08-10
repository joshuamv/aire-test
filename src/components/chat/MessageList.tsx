"use client";
import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import { AgentChip } from "@/components/agents/AgentChip";
import { AssistantHeader } from "@/components/chat/AssistantHeader";
import { SuggestionList } from "@/components/chat/SuggestionList";
import { MessageActions } from "@/components/chat/MessageActions";
import { emitAudit } from "@/lib/audit";
import type { ChatMessage as ChatMessageType } from "@/lib/types";

export type ChatMessage = ChatMessageType;

export type MessageListProps = {
  messages: ChatMessage[];
  isLoading?: boolean;
  className?: string;
};

export function MessageList({ messages, isLoading, className }: MessageListProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 84,
    overscan: 6,
  });

  const rows = rowVirtualizer.getVirtualItems();

  const items = useMemo(() => messages, [messages]);

  const renderBubble = (msg: ChatMessage) => {
    const isAssistant = msg.role === "assistant";
    const when = msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
    return (
      <div className="px-1 py-2" key={msg.id} role="listitem">
        <div className="max-w-prose rounded-lg px-3 py-2 text-sm shadow-sm bg-card">
          {isAssistant ? (
            <AssistantHeader
              agentId={(msg as any)?.routing?.agents?.[0]?.id}
              agentName={msg.agentName}
              decision={(msg as any)?.routing}
              reasonSeconds={Math.max(1, Math.round(((msg.meta?.decisionDurationMs ?? 0) / 1000) || 0))}
              onOpenReasoning={() => emitAudit({ type: "REASONING_VIEWED", decision: (msg as any)?.routing })}
            />
          ) : (
            <div className="mb-1 text-right text-[11px] opacity-70">
              <time dateTime={new Date(msg.createdAt as string | Date).toString()}>{when}</time>
            </div>
          )}
          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
          {isAssistant ? (
            <>
              <SuggestionList
                suggestions={["[suggestion 1]", "[suggestion 2]", "[suggestion 3]", "[suggestion 4]"]}
                onPick={(t) => navigator.clipboard.writeText(t).catch(() => {})}
              />
              <MessageActions messageId={msg.id} text={msg.content} />
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative h-[60vh] w-full overflow-y-auto rounded-md border bg-card p-3 sm:h-[70vh]",
        className,
      )}
      aria-busy={isLoading ? "true" : "false"}
    >
      {rows.length === 0 ? (
        <div aria-live="polite" role="list">
          {items.map((m) => renderBubble(m))}
        </div>
      ) : (
        <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }} aria-live="polite" role="list">
          {rows.map((virtualRow) => {
            const msg = items[virtualRow.index];
            const top = virtualRow.start;
            return (
              <div key={msg.id} role="listitem" className="absolute left-0 w-full" style={{ transform: `translateY(${top}px)` }}>
                {renderBubble(msg)}
              </div>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-2" aria-hidden>
          <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      ) : null}
    </div>
  );
}


