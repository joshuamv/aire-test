import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AGENT_ICON, AGENT_COLOR_CLASS } from "@/lib/agents";
import type { AgentId } from "@/lib/types";

export type AgentItem = {
  name: string;
  riskTier?: "low" | "medium" | "high";
  id?: AgentId;
};

export type AgentBarProps = {
  agents: AgentItem[];
  className?: string;
};

function riskClasses(tier?: "low" | "medium" | "high") {
  switch (tier) {
    case "high":
      return "bg-red-500/15 text-red-700 dark:text-red-400";
    case "medium":
      return "bg-amber-500/15 text-amber-700 dark:text-amber-400";
    default:
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  }
}

export function AgentBar({ agents, className }: AgentBarProps) {
  if (!agents?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Selected agents">
      {agents.map((a) => {
        const Icon = a.id ? AGENT_ICON[a.id] : undefined;
        return (
          <Badge key={`${a.name}-${a.riskTier}`} variant="secondary" className={cn("gap-1 border-0", riskClasses(a.riskTier), a.id && AGENT_COLOR_CLASS[a.id])}>
            {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />}
            <span className="text-[11px] font-medium leading-none">{a.name}</span>
          </Badge>
        );
      })}
    </div>
  );
}


