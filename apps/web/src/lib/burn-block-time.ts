/**
 * Estimates the timestamp of a future Stacks block based on average block times.
 * 
 * @param currentBlock - Current burn block height
 * @param targetBlock - Target burn block height
 * @returns Estimated timestamp in milliseconds
 */
export function estimateBlockTime(currentBlock: number, targetBlock: number): number {
  const diff = targetBlock - currentBlock;
  if (diff <= 0) return Date.now();
  
  // Stacks blocks follow Bitcoin blocks, roughly 10 minutes (600,000 ms)
  const MS_PER_BLOCK = 600_000;
  return Date.now() + (diff * MS_PER_BLOCK);
}

/**
 * Returns the average blocks per day.
 */
export const BLOCKS_PER_DAY = 144;
