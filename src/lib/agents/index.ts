import { sightSpec } from "@/lib/agents/sight";
import { populationBuilderSpec } from "@/lib/agents/population_builder";
import { genomicsSpec } from "@/lib/agents/genomics";
import { summarizerSpec } from "@/lib/agents/summarizer";
import { medsSpec } from "@/lib/agents/meds";
import { endocrinologySpec } from "@/lib/agents/endocrinology";
import { cardiologySpec } from "@/lib/agents/cardiology";
import { oncologySpec } from "@/lib/agents/oncology";
import { radiologySpec } from "@/lib/agents/radiology";
import type { AgentSpec } from "@/lib/agents/spec";

export const AGENT_SPECS: Record<string, AgentSpec> = Object.fromEntries(
  [
    sightSpec,
    populationBuilderSpec,
    genomicsSpec,
    summarizerSpec,
    medsSpec,
    endocrinologySpec,
    cardiologySpec,
    oncologySpec,
    radiologySpec,
  ].map((s) => [s.id, s]),
);


