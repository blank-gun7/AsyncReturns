@AGENTS.md

# AsyncReturns — Project Rules

## Knowledge and Accuracy

- Only state what you know for certain. If unsure, say so — never guess or fabricate.
- When referencing APIs, libraries, or platform behavior, verify against the actual codebase or docs first.
- If a question falls outside your confirmed knowledge, say "I don't know" and suggest where to look.

## Deployment Safety

- Every PR must pass lint, type-check, and tests before merge. No exceptions.
- Never merge directly to `main`. All changes go through feature branches and PR review.
- Run `npm run build` locally before marking a PR as ready. If the build breaks, it does not ship.
- Check for breaking changes in any shared component, API route, or data model before pushing.
- Database migrations and schema changes get their own isolated PR — never bundled with feature work.
- Environment variables and secrets never appear in code, commits, or logs.

## Naming Conventions

Follow enterprise-grade naming, but keep it readable:

- **Branches**: `feature/add-bid-queue`, `fix/pricing-rounding-error`, `chore/update-deps`
- **Commits**: Start with a verb — `add`, `fix`, `update`, `remove`, `refactor`. One sentence, lowercase.
- **Components**: PascalCase, descriptive — `BidPlacementCard`, `AdSlotPreview`, `PricingTierSelector`
- **Files**: kebab-case for pages and utils — `bid-queue.ts`, `pricing-helpers.ts`
- **API routes**: kebab-case, noun-based — `/api/ad-slots`, `/api/bid-history`
- **Database tables/columns**: snake_case — `ad_slots`, `bid_amount`, `created_at`
- **CSS/Tailwind**: Follow the existing pattern in the codebase. No new naming systems.

## Agentic Workflow Architecture

This project uses a two-tier agent system for automated maintenance:

### Tier 1 — Planner (Opus, Plan Mode)

- All non-trivial work starts in plan mode.
- The planner reads the issue, researches the codebase, and produces a step-by-step breakdown.
- Each step becomes a focused, self-contained task with clear inputs, outputs, and acceptance criteria.
- The planner does NOT write code — it designs the work.

### Tier 2 — Executor (Sonnet Agents)

- Each task from the planner is handled by a dedicated Sonnet agent.
- One agent per task — small scope, fast execution, easy to review.
- Agents run in isolated worktrees when touching code.
- Results are validated against the acceptance criteria before merging.

### Orchestration

- An orchestrator agent oversees the full lifecycle: plan → assign → execute → validate → merge.
- It monitors for new issues, PR feedback, CI failures, and security alerts.
- It can re-kick failed tasks, reassign, or escalate to the planner if scope changes.
- The orchestrator never writes code itself — it coordinates.

### Automation Scope

| Domain | Automated | Owner |
|---|---|---|
| Code changes (features, fixes, refactors) | Yes — planner + executor agents | Agents |
| Testing and CI | Yes — agents write and run tests | Agents |
| Security scanning and patching | Yes — automated via agents + dependabot | Agents |
| Dependency updates | Yes — auto-PR with test validation | Agents |
| PR review and merge | Yes — with CI gate and orchestrator approval | Agents |
| Marketing strategy and content | No — handled separately | User |
| Infrastructure and deploy config | Semi — agents propose, user approves | Shared |

## Next.js Rules

Read `node_modules/next/dist/docs/` before writing any Next.js code. This version may differ from training data.
