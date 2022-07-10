import { trimToLowerCaseString, capitalizeFirstLetter } from '../lib/utils/format-text';

describe('format text', () => {
  describe('trim and lowercase text', () => {
    it('should return the string with all lowercase letters', () => {
      expect(trimToLowerCaseString('Hello')).toBe('hello');
    });

    it('should return the string with all lowercase letters and no spaces', () => {
      expect(trimToLowerCaseString('  Hello World  ')).toBe('hello world');
    });
  });

  describe('capitalize first letter', () => {
    it('should return the string with the first letter capitalized', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('should return the string with the first letter of the 2 words capitalized', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    });
  });
});
