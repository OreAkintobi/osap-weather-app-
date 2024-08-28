import { validateLocation } from '../../src/utils';

describe('validateLocation', () => {
  it('should return true for a non-empty location string', () => {
    expect(validateLocation('New York')).toBe(true);
  });

  it('should return false for an empty location string', () => {
    expect(validateLocation('')).toBe(false);
  });

  it('should return false for a location string with only whitespace', () => {
    expect(validateLocation('   ')).toBe(false);
  });

  it('should return true for a location string with leading and trailing whitespace', () => {
    expect(validateLocation('   London   ')).toBe(true);
  });

  it('should return true for a location string with multiple words', () => {
    expect(validateLocation('San Francisco')).toBe(true);
  });

  it('should return false for a location string that becomes empty after trimming', () => {
    expect(validateLocation(' \t\n ')).toBe(false);
  });
});
