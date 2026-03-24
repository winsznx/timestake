import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'habit-registry creates a habit and increments the count',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    const block = chain.mineBlock([
      Tx.contractCall(
        'habit-registry',
        'create-habit',
        [
          types.utf8('Deep Work'),
          types.utf8('Focus block before email'),
          types.uint(7),
          types.uint(10),
        ],
        deployer.address
      ),
      Tx.contractCall('habit-registry', 'get-habit-count', [], deployer.address),
    ]);

    assertEquals(block.receipts[0].result, '(ok u1)');
    assertEquals(block.receipts[1].result, '(ok u1)');
  },
});
