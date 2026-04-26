import { formatDuration } from '../format-duration';

describe('formatDuration', () => { it('formats ms', () => { expect(formatDuration(60000)).toBe('1m'); }); });