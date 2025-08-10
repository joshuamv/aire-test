export type RiskTier = "low" | "medium" | "high";

export type AgentId =
  | "endocrinology"
  | "meds"
  | "cardiology"
  | "oncology"
  | "radiology"
  | "genomics"
  | "population_builder"
  | "sight"
  | "summarizer"
  | "fallback";

export type Agent = {
  id: AgentId;
  name: string;
  riskTier?: RiskTier;
};

export type AgentMeta = {
  id: AgentId;
  label: string;
  icon: string; // lucide name
  colorToken: keyof typeof import("tailwindcss/types/generated/colors");
};

export type RoutingCandidate = {
  agent: Agent;
  score: number; // 0..1
  reasons: string[];
};

export type RoutingDecision = {
  rationale: string;
  agents: Array<{
    id?: AgentId;
    name: string;
    score: number;
    reasons: string[];
    riskTier?: RiskTier;
  }>;
  features: { keywords?: string[]; entities?: string[]; flags?: string[] };
};

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt?: Date | string;
  agentName?: string;
  agentRisk?: RiskTier;
  routing?: RoutingDecision;
};


