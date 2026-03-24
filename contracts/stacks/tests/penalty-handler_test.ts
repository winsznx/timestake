import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'penalty-handler accumulates missed day penalties',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get('wallet_1')!;

    const block = chain.mineBlock([
      Tx.contractCall(
        'penalty-handler',
        'apply-penalty',
        [types.principal(user.address), types.uint(1), types.uint(3)],
        user.address
      ),
      Tx.contractCall(
        'penalty-handler',
        'get-penalties',
        [types.principal(user.address), types.uint(1)],
        user.address
      ),
    ]);

    assertEquals(block.receipts[0].result, '(ok u30)');
    assertEquals(
      block.receipts[1].result,
      '(tuple (total-penalties u1) (total-slashed u30))'
    );
  },
});
