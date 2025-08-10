# Privacy

- This project does not store PHI client‑side. The only browser persistence is a developer toggle for explainability (`aire:alwaysShowReasoning`).
- Routing decisions are computed from prompt text only and returned in API responses for explainability; no third‑party services are contacted in the deterministic mode.
- If/when an LLM or external planner is used, document data flows, retention, and access controls. Prefer regional endpoints and enterprise agreements.
