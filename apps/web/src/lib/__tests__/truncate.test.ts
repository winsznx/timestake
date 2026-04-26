import { truncate } from '../truncate';

describe('truncate', () => { it('truncates long strings', () => { expect(truncate('123456', 3)).toBe('123...'); }); });