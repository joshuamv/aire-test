import type { RoutingDecision, AgentId, Agent } from "@/lib/types";

const AGENTS: Record<AgentId, Agent> = {
  endocrinology: { id: "endocrinology", name: "Endocrinology", riskTier: "low" },
  meds: { id: "meds", name: "Meds", riskTier: "medium" },
  cardiology: { id: "cardiology", name: "Cardiology", riskTier: "low" },
  oncology: { id: "oncology", name: "Oncology", riskTier: "low" },
  radiology: { id: "radiology", name: "Radiology", riskTier: "low" },
  genomics: { id: "genomics", name: "Genomics", riskTier: "medium" },
  population_builder: { id: "population_builder", name: "Population Builder", riskTier: "medium" },
  sight: { id: "sight", name: "Sight", riskTier: "low" },
  summarizer: { id: "summarizer", name: "Summarizer", riskTier: "low" },
  fallback: { id: "fallback", name: "General", riskTier: "low" },
};

const KEYWORDS: Partial<Record<AgentId, string[]>> = {
  endocrinology: ["diabetes", "a1c", "hyperglycemia", "hypoglycemia"],
  meds: ["medication", "drug", "dose", "dosage", "interaction"],
  cardiology: ["cardio", "heart", "ecg", "cardiac"],
  oncology: ["tumor", "cancer", "chemo", "oncology"],
  radiology: ["x-ray", "mri", "ct", "radiology", "imaging"],
  genomics: ["gene", "genomic", "variant", "snv", "harmonization"],
  population_builder: ["cohort", "population", "analytics", "stratify", "incidence"],
  sight: ["literature", "paper", "pubmed", "study", "systematic review"],
  summarizer: ["summary", "summarize", "tl;dr", "brief"],
};

export function extractFeatures(text: string): RoutingDecision["features"] {
  const t = text.toLowerCase();
  const keywords: string[] = [];
  const entities: string[] = [];
  const flags: string[] = [];

  // collect matched keywords
  for (const list of Object.values(KEYWORDS)) {
    if (!list) continue;
    for (const k of list) {
      if (t.includes(k) && !keywords.includes(k)) keywords.push(k);
    }
  }

  // very simple entity hints
  if (/(metformin|insulin|warfarin|statin)s?/.test(t)) entities.push(RegExp.$1.toLowerCase());
  if (/(patient|dob|mrn)/.test(t)) flags.push("PHI_sensitive");

  return { keywords, entities, flags };
}

export function scoreAgents(features: RoutingDecision["features"]) {
  const scores: Array<{ agent: Agent; score: number; reasons: string[] }> = [];
  for (const [agentId, list] of Object.entries(KEYWORDS) as Array<[AgentId, string[]]>) {
    const matched = (list || []).filter((k) => features.keywords?.includes(k));
    const score = matched.length / Math.max(1, (list || []).length);
    if (score > 0) {
      scores.push({ agent: AGENTS[agentId], score, reasons: matched.map((m) => `matched '${m}'`) });
    }
  }
  // If nothing matched, return summarizer as default with low score
  if (scores.length === 0) {
    scores.push({ agent: AGENTS.summarizer, score: 0.1, reasons: ["no strong signals, default to summarizer"] });
  }
  // sort desc
  scores.sort((a, b) => b.score - a.score);
  return scores;
}

export function routePrompt(text: string): RoutingDecision {
  const features = extractFeatures(text);
  const ranked = scoreAgents(features);
  const top = ranked.slice(0, 2);
  return {
    rationale:
      top.length > 0
        ? `Selected ${top.map((r) => r.agent.name).join(", ")} based on ${features.keywords?.join(", ") || "general intent"}.`
        : "Default routing.",
    agents: top.map((r) => ({
      id: r.agent.id,
      name: r.agent.name,
      score: Number(r.score.toFixed(2)),
      reasons: r.reasons,
      riskTier: r.agent.riskTier,
    })),
    features,
  };
}


