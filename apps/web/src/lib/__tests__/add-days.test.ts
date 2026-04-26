import { addDays } from '../add-days';

describe('addDays', () => { it('adds days correctly', () => { const d = new Date('2024-01-01'); expect(addDays(d, 5).getDate()).toBe(6); }); });