import { omit } from '../omit';

describe('omit', () => { it('omits keys', () => { expect(omit({a:1, b:2}, ['a'])).toEqual({b:2}); }); });