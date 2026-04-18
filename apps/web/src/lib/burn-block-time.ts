import { DEFAULT_NETWORK } from './constants';

const BTC_BLOCK_MS = 10 * 60 * 1000;

const apiBase =
  DEFAULT_NETWORK === 'mainnet' ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so';

interface BurnTip {
  height: number;
  timestampMs: number;
}

let cachedTip: BurnTip | null = null;
let inflight: Promise<BurnTip> | null = null;

interface BlockListResponse {
  results: Array<{ burn_block_height: number; burn_block_time: number }>;
}

async function fetchTip(): Promise<BurnTip> {
  const res = await fetch(`${apiBase}/extended/v1/block?limit=1`);
  if (!res.ok) {
    throw new Error(`Block tip fetch failed: ${res.status}`);
  }
  const json = (await res.json()) as BlockListResponse;
  const tip = json.results[0];
  if (!tip) {
    throw new Error('Block tip response missing results');
  }
  return {
    height: tip.burn_block_height,
    timestampMs: tip.burn_block_time * 1000,
  };
}

export async function ensureBurnTip(): Promise<void> {
  if (cachedTip) {
    return;
  }
  if (!inflight) {
    inflight = fetchTip()
      .then((tip) => {
        cachedTip = tip;
        return tip;
      })
      .finally(() => {
        inflight = null;
      });
  }
  await inflight;
}

export function burnBlockHeightToIso(height: number): string | null {
  if (!height || height <= 0 || !cachedTip) {
    return null;
  }
  const deltaBlocks = height - cachedTip.height;
  return new Date(cachedTip.timestampMs + deltaBlocks * BTC_BLOCK_MS).toISOString();
}
