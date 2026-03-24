# StreakBit Contracts

## habit-registry

Purpose: create and manage habits.

Public functions:

- `create-habit`
- `deactivate-habit`

Read-only functions:

- `get-habit`
- `get-user-habit`
- `get-habit-count`

## check-in-manager

Purpose: enforce one check-in window per day and store streak progression.

Public functions:

- `check-in`

Read-only functions:

- `get-streak`
- `can-check-in`

## reward-distributor

Purpose: calculate streak-based rewards and record claims.

Public functions:

- `calculate-and-set-reward`
- `claim-reward`

Read-only functions:

- `get-reward`

## penalty-handler

Purpose: record penalties when users miss required habit days.

Public functions:

- `apply-penalty`

Read-only functions:

- `get-penalties`

## leaderboard

Purpose: accumulate points and track the highest visible score.

Public functions:

- `update-score`

Read-only functions:

- `get-score`
- `get-top-score`
