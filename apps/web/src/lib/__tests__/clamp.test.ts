import { clamp } from '../clamp';

describe('clamp', () => { it('clamps values', () => { expect(clamp(15, 0, 10)).toBe(10); expect(clamp(-5, 0, 10)).toBe(0); }); });