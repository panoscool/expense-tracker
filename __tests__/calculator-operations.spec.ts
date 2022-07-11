import { evaluate } from '../lib/utils/calculator-operations';

describe('evaluate calculator operations', () => {
  it('should return the sum of two numbers', () => {
    const result = evaluate({
      currentOperand: '2',
      previousOperand: '1',
      operation: '+',
    });

    expect(result).toBe('3');
  });

  it('should return the difference of two numbers', () => {
    const result = evaluate({
      currentOperand: '2',
      previousOperand: '1',
      operation: '-',
    });

    expect(result).toBe('-1');
  });

  it('should return the multiplication of two numbers', () => {
    const result = evaluate({
      currentOperand: '2',
      previousOperand: '1',
      operation: '*',
    });

    expect(result).toBe('2');
  });

  it('should return the division of two numbers', () => {
    const result = evaluate({
      currentOperand: '2',
      previousOperand: '1',
      operation: '÷',
    });

    expect(result).toBe('0.5');
  });

  it('should return nothing if the values is NaN', () => {
    const result = evaluate({
      currentOperand: 'test',
      previousOperand: 'test',
      operation: '+',
    });

    expect(result).toBe('');
  });
});
