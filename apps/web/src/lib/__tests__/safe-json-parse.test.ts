import { safeJsonParse } from '../safe-json-parse';

describe('safeJsonParse', () => { it('parses safely', () => { expect(safeJsonParse('{"a":1}', {})).toEqual({a:1}); }); });