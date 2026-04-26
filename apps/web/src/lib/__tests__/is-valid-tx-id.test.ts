import { isValidTxId } from '../is-valid-tx-id';

describe('isValidTxId', () => { it('validates tx ids', () => { expect(isValidTxId('0x' + 'a'.repeat(64))).toBe(true); }); });