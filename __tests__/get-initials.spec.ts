import { getInitials } from '../lib/utils/get-initials';

describe('get initials from text', () => {
  it('should return the first letter in capital', () => {
    expect(getInitials('Hello')).toBe('H');
  });

  it('should return the first 2 letters in capital', () => {
    expect(getInitials('Hello World')).toBe('HW');
  });

  it('should trim and return the first 2 letters in capital', () => {
    expect(getInitials(' Hello World ')).toBe('HW');
  });
});
