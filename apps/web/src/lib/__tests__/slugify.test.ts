import { slugify } from '../slugify';

describe('slugify', () => { it('slugifies text', () => { expect(slugify('Hello World!')).toBe('hello-world'); }); });