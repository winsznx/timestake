import { pick } from '../pick';

describe('pick', () => { it('picks keys', () => { expect(pick({a:1, b:2}, ['a'])).toEqual({a:1}); }); });