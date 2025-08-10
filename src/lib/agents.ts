import type { AgentId } from "@/lib/types";
import {
  Book,
  Lightbulb,
  Users,
  Grid,
  GraduationCap,
  Eraser,
  BarChart,
  Brackets,
  ClipboardList,
  Bot,
} from "lucide-react";

export const AGENT_ICON: Record<AgentId, React.ComponentType<{ className?: string }>> = {
  sight: Book,
  population_builder: Users,
  genomics: Eraser, // harmonization
  summarizer: ClipboardList,
  meds: Lightbulb, // hypothesis-like
  endocrinology: GraduationCap, // methodology-ish
  cardiology: Grid, // design
  oncology: BarChart, // descriptives
  radiology: Brackets, // analytics
  fallback: Bot,
};

export const AGENT_COLOR_CLASS: Record<AgentId, string> = {
  sight: "text-agent-sight",
  population_builder: "text-agent-population_builder",
  genomics: "text-agent-genomics",
  summarizer: "text-agent-summarizer",
  meds: "text-agent-meds",
  endocrinology: "text-agent-endocrinology",
  cardiology: "text-agent-cardiology",
  oncology: "text-agent-oncology",
  radiology: "text-agent-radiology",
  fallback: "text-agent-fallback",
};


