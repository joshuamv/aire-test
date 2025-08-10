# Security

- Routing runs server‑side in Next.js route handlers (`src/app/api/**`).
- The frontend does not persist PHI or routing details to local storage beyond the developer‑only explainability toggle flag.
- The stub `RoutingDecision` rationale is derived from prompt tokens and keyword matches; no external calls are made in the deterministic router.
- When integrating external LLMs or planners, ensure prompts and decisions are treated as sensitive: add redaction, audit logging, and DLP as needed.
