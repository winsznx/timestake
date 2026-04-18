# FAQ

### What is StreakBit?

StreakBit is a daily habit and streak protocol deployed on the Stacks blockchain.
Users stake STX against habits and earn streak-based rewards as they check in over time.

### Which wallets are supported?

Any wallet that speaks the Stacks Connect protocol (Hiro Wallet, Xverse, Leather).

### How are rewards calculated?

Rewards scale with a streak multiplier (2x at 7 days, 3x at 14 days, 5x at 30 days)
applied to the base emissions configured by each habit's stake.

### Where can I find the contracts?

Clarity sources live under `contracts/stacks/`. Mainnet contract addresses are
configured via `NEXT_PUBLIC_CONTRACT_ADDRESS` in the web app.

### How do I run the web app locally?

```
pnpm install
pnpm dev
```

The app starts at `http://localhost:3000`.
