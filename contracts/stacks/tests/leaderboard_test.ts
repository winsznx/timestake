import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'leaderboard updates score and top score',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get('wallet_1')!;

    const block = chain.mineBlock([
      Tx.contractCall(
        'leaderboard',
        'update-score',
        [types.principal(user.address), types.uint(50)],
        user.address
      ),
      Tx.contractCall('leaderboard', 'get-top-score', [], user.address),
    ]);

    assertEquals(block.receipts[0].result, '(ok u50)');
    assertEquals(block.receipts[1].result, '(ok u50)');
  },
});
