import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AGENT_COLOR_CLASS, AGENT_ICON } from "@/lib/agents";
import type { AgentId } from "@/lib/types";

export type AgentChipProps = {
  name: string;
  riskTier?: "low" | "medium" | "high";
  className?: string;
  id?: AgentId;
};

export function AgentChip({ name, riskTier = "low", className, id }: AgentChipProps) {
  const color =
    riskTier === "high"
      ? "bg-red-500/15 text-red-700 dark:text-red-400"
      : riskTier === "medium"
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
        : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  const tone = id ? AGENT_COLOR_CLASS[id] : undefined;
  const Icon = id ? AGENT_ICON[id] : undefined;

  return (
    <Badge variant="secondary" className={cn("gap-1 border-0", color, tone, className)}>
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />}
      <span className="text-[11px] font-medium leading-none">{name}</span>
    </Badge>
  );
}


