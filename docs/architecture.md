# StreakBit Architecture

## Overview

StreakBit is a Stacks-first habit product with a single frontend and a small Clarity contract suite.

## Main layers

- `apps/web` renders the habit, reward, and leaderboard experience
- `contracts/stacks` defines habit registration, check-ins, rewards, penalties, and score tracking
- The current frontend uses a demo persistence layer to simulate wallet-backed usage while the contract integration path is finalized

## Web app flow

1. A user opens the dashboard and connects a demo wallet session
2. Habits are created from the habit form and stored in local demo state
3. Daily check-ins update streak counters, reward balances, and leaderboard score projections
4. Rewards can be claimed from the rewards page and reflected in history

## Contract responsibilities

- `habit-registry.clar`: habit creation, ownership, and activation state
- `check-in-manager.clar`: per-user streak progression and daily check-in gating
- `reward-distributor.clar`: reward calculation and claim storage
- `penalty-handler.clar`: missed-day penalty accumulation
- `leaderboard.clar`: score accumulation and top-score tracking

## Deployment model

- Frontend deploys independently from the contracts
- Contract addresses are injected into the frontend through environment variables
- Clarinet settings files support simnet, devnet, testnet, and mainnet validation paths
