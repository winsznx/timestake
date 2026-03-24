# StreakBit

StreakBit is a Stacks-first daily habit and streak product. Users define habits, check in each day, accumulate streak-powered rewards, and compete on a leaderboard that turns consistency into a visible on-chain ritual.

## What is in the repo

- `apps/web`: Next.js 14 product UI with dashboard, habits, rewards, and leaderboard pages
- `contracts/stacks`: Clarity contract suite for habit registry, check-ins, rewards, penalties, and leaderboard state
- `AGENT_GUIDE.md`: project guide used to shape the product direction and repo goals
- `.github/workflows`: CI, Clarity validation, and frontend deployment automation
- `docs/`: architecture, contract, deployment, and contribution notes

## Product highlights

- Daily habit creation flow with cadence and stake sizing
- Habit detail pages with streak metrics and check-in history
- Rewards center with claimable balances and claim history
- Leaderboard views for 7-day, 30-day, and all-time momentum
- Stacks-oriented contract catalog and demo-ready frontend hooks

## Local development

```bash
pnpm install
pnpm dev
```

Open the web app at `http://localhost:3000`.

## Useful scripts

```bash
pnpm lint
pnpm type-check
pnpm build
pnpm test
```

`pnpm test` currently runs `clarinet check` against the Stacks contracts because the Clarinet binary available in this environment does not expose the newer `clarinet test` subcommand.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Smart contracts: Clarity + Clarinet
- Package manager: pnpm

## License

MIT
