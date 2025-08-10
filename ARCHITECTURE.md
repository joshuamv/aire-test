# AIRE test – Architecture

This document explains the deterministic routing pipeline, the data contracts that flow through it, and how explainability is surfaced in the UI.

## Routing pipeline

Current routing is deterministic and runs entirely server‑side.

1) Feature extraction
- Source: prompt text
- Impl: `extractFeatures(text)` in `src/lib/routing.ts`
- Output: keywords, entities, flags (e.g., `PHI_sensitive`)

2) Agent scoring
- Source: extracted features
- Impl: `scoreAgents(features)` in `src/lib/routing.ts`
- Scoring: keyword overlap per agent against a configurable keyword map. Produces ranked candidates `{ agent, score, reasons }`.

3) Routing decision
- Source: ranked candidates + features
- Impl: `routePrompt(text)` in `src/lib/routing.ts`
- Output: `RoutingDecision` with:
  - `rationale` (concise explanation)
  - `agents[]` (top candidates with score/reasons/risk tier)
  - `features` (keywords/entities/flags)

4) Server API
- `POST /api/route`: returns a `RoutingDecision` (no message) – see `src/app/api/route/route.ts`
- `POST /api/chat`: calls `routePrompt`, then returns a stub assistant message with an attached `RoutingDecision` – see `src/app/api/chat/route.ts`

## Data contracts

Type definitions live in `src/lib/types.ts`. Key contracts:
- `RoutingDecision`: rationale, selected agents with `{ id, name, score, reasons, riskTier }`, and `features`.
- `ChatMessage`: includes optional `routing?: RoutingDecision` for assistant messages.
- Zod validators in `src/lib/validators.ts` (server‑side validation).

## Explainability UI

- Components: `src/components/reasoning/ReasoningDrawer.tsx`, `src/components/agents/AgentBar.tsx`, `src/components/agents/AgentChip.tsx`
- Behavior:
  - The drawer can be opened via the “Why this route?” trigger.
  - A settings toggle controls auto‑open after assistant messages (see `src/app/settings/page.tsx` and `useRoutingStore` in `src/lib/stores.ts`).
- Visuals:
  - Agent color tokens are defined in `src/styles/theme.css` and surfaced via Tailwind in `tailwind.config.ts` under `colors.agent.*`.
  - Canonical agent→icon/color mapping lives in `src/lib/agents.ts`.

## Decision modes (future)

- Deterministic (current): keyword‑based scoring (fast, transparent).
- Model‑assisted: plug a planner/LLM for classification, keep deterministic fallback.
- Hybrid: model proposes, deterministic constraints validate/sanitize output; store both “proposal” and “final” decisions for explainability.

Integration points:
- Swap or augment `routePrompt` to call a planner/LLM.
- Keep `RoutingDecision` stable; ensure each selection includes at least one human‑readable reason.
