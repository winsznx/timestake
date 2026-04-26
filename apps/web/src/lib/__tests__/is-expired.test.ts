import { isExpired } from '../is-expired';

describe('isExpired', () => { it('checks expiry', () => { expect(isExpired(Date.now() - 1000)).toBe(true); }); });