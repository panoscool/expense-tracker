export const formatCurrency = (value: number, currency?: string): string => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency || 'aed',
    minimumFractionDigits: 0,
  });

  return CURRENCY_FORMATTER.format(value);
};

export const formatOperand = (operand: string | null): string | undefined => {
  const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 0,
  });

  if (operand == null) return;

  const [integer, decimal] = operand.split('.');

  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer));

  return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`;
};
