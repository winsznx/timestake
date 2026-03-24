# Deployment

## Frontend

1. Set `NEXT_PUBLIC_NETWORK`
2. Set `NEXT_PUBLIC_CONTRACT_ADDRESS`
3. Run:

```bash
pnpm install
pnpm build
```

4. Deploy the `apps/web` output through your preferred Next.js hosting target

## Contracts

Validate contracts locally first:

```bash
pnpm test
```

Direct Clarinet validation:

```bash
cd contracts/stacks
clarinet check
```

Before real deployment, replace the placeholder mnemonics in `contracts/stacks/settings/*.toml`.

## Notes

- The current frontend still uses demo state for user interactions
- Contract addresses should only be promoted to production after deployment verification
- Keep frontend and contract releases versioned together in release notes
