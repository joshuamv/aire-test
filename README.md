## AIRE test

Production-ready Next.js (App Router) + TypeScript app using pnpm with Tailwind, shadcn/ui, Zustand, TanStack Query, React Hook Form, Zod, Lucide, ESLint+Prettier, Vitest+RTL, and Playwright.

### Getting Started

1) Install dependencies:
```bash
pnpm install
```

2) Start dev server:
```bash
pnpm dev
```
Visit http://localhost:3000

3) Type-check:
```bash
pnpm typecheck
```

4) Lint and format:
```bash
pnpm lint
pnpm format
```

5) Unit tests:
```bash
pnpm test
```

6) E2E placeholder:
```bash
pnpm e2e
```

### Environment
Create `.env.local` based on `.env.local.example`.

### Project Structure
- `src/app` (Next.js App Router)
  - `layout.tsx`: global shell, header/nav, footer; manifest and fonts
  - `page.tsx`: chat home rendering `ChatPanel`
  - `settings/page.tsx`: Explainability toggle (always show reasoning)
- `src/components/common`
  - `PageShell.tsx`: responsive container and skip link
  - `EmptyState.tsx`: icon + title + description pattern
- `src/components/chat`
  - `ChatPanel.tsx`: orchestrates message list, composer, agent bar, reasoning drawer
  - `MessageList.tsx`: virtualized list (falls back in tests); role styles; timestamps
  - `Composer.tsx`: autosizing textarea, send action, quick actions, counter
- `src/components/agents`
  - `AgentChip.tsx`: risk-tier badge
  - `AgentBar.tsx`: chips for selected agents with icons
- `src/components/reasoning`
  - `ReasoningDrawer.tsx`: Sheet with rationale, selected agents table, features matched
- `src/components/ui`: shadcn/ui primitives
- `src/lib`
  - `types.ts`: Agents, messages, routing types
  - `stores.ts`: Zustand store (`showReasoning`, `alwaysShowReasoning`, `routingHistory`)
  - `validators.ts`: zod schemas for messages and routing decisions
  - `routing.ts`: deterministic keyword-based router (`extractFeatures`, `scoreAgents`, `routePrompt`)
- `src/app/api`
  - `route/route.ts`: POST `/api/route` → `routePrompt`
  - `chat/route.ts`: POST `/api/chat` routes then returns a stubbed assistant message with routing
- `src/__tests__`
  - `routing.test.ts`: basic routing coverage
  - `message-list.test.tsx`, `sample.test.tsx`

### Dev notes
- Tests use Vitest + RTL; `tsconfig` includes `vitest/globals` and `vite-tsconfig-paths` plugin for aliases.
- For scripted API checks, start dev in background and poll readiness before curl.

### Routing and explainability
- Deterministic router: see [`ARCHITECTURE.md`](ARCHITECTURE.md) for pipeline and contracts.
- Keyword map lives in `src/lib/routing.ts` (`KEYWORDS`). Adjust or extend per agent.
- To plug a real planner/LLM: augment `routePrompt` or add a new API path, keep `RoutingDecision` contract stable.

### Security/Privacy
- See [`SECURITY.md`](SECURITY.md) and [`PRIVACY.md`](PRIVACY.md). In deterministic mode, routing is server‑side and no PHI is persisted on the client.

