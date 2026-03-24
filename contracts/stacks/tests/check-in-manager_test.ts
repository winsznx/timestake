import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'check-in-manager stores streak data after a check-in',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get('wallet_1')!;

    const block = chain.mineBlock([
      Tx.contractCall('check-in-manager', 'check-in', [types.uint(1)], user.address),
      Tx.contractCall(
        'check-in-manager',
        'get-streak',
        [types.principal(user.address), types.uint(1)],
        user.address
      ),
    ]);

    assertEquals(block.receipts[0].result, '(ok u1)');
    assertEquals(
      block.receipts[1].result,
      '(tuple (last-check-in u2) (streak u1) (total-check-ins u1))'
    );
  },
});
