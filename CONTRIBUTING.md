# Contributing to StreakBit

Thanks for helping build StreakBit.

## Local setup

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm type-check
pnpm build
pnpm test
```

## Project shape

- `apps/web`: Next.js frontend
- `contracts/stacks`: Clarity contracts and settings
- `docs`: product and engineering documentation

## Contribution expectations

- Keep the product aligned with the StreakBit habit and streak experience
- Prefer focused changes over broad unrelated refactors
- Validate changes before opening a PR
- Preserve the dark visual system and Stacks-first framing

## Pull requests

- Explain the user-facing impact
- Mention any contract or workflow implications
- Include screenshots for UI changes when helpful
- Call out anything that could affect deployment or wallet behavior

## Commits

The project guide prefers very granular commits. When continuing this repo, keep changes small and use descriptive messages such as:

- `feat(web): add rewards history table`
- `feat(contracts): add leaderboard score contract`
- `docs(deployment): outline clarinet validation flow`
- `fix(ui): correct dashboard card spacing`
