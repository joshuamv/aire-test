import { AGENT_COLOR_CLASS, AGENT_ICON } from "@/lib/agents";
import type { AgentId, RoutingDecision } from "@/lib/types";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

export function AssistantHeader({
  agentId,
  agentName,
  decision,
  onOpenReasoning,
  reasonSeconds,
}: {
  agentId?: AgentId;
  agentName?: string;
  decision?: RoutingDecision;
  onOpenReasoning?: () => void;
  reasonSeconds?: number;
}) {
  const isAgent = !!agentId && !!agentName;
  const Icon = agentId ? AGENT_ICON[agentId] : null;
  return (
    <div className="mb-1 flex items-center gap-2 text-sm">
      {isAgent ? (
        <>
          {Icon ? <Icon className={cn("h-4 w-4", agentId && AGENT_COLOR_CLASS[agentId])} aria-hidden /> : null}
          <span className={cn("font-medium", agentId && AGENT_COLOR_CLASS[agentId])}>{agentName} agent</span>
        </>
      ) : (
        <>
          <Dot className="h-5 w-5 text-muted-foreground" aria-hidden />
          <span className="font-medium">AIRE</span>
        </>
      )}
      <button
        type="button"
        onClick={onOpenReasoning}
        className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Reasoned for {reasonSeconds ?? 10} seconds ›
      </button>
    </div>
  );
}


