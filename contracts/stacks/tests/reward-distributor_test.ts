import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'reward-distributor calculates and claims a reward',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const user = accounts.get('wallet_1')!;

    const block = chain.mineBlock([
      Tx.contractCall(
        'reward-distributor',
        'calculate-and-set-reward',
        [types.principal(user.address), types.uint(1), types.uint(14)],
        deployer.address
      ),
      Tx.contractCall('reward-distributor', 'claim-reward', [types.uint(1)], user.address),
    ]);

    assertEquals(block.receipts[0].result, '(ok u30)');
    assertEquals(block.receipts[1].result, '(ok u30)');
  },
});
