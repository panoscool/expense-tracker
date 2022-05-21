type Evaluate = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
};

export const evaluate = ({ currentOperand, previousOperand, operation }: Evaluate): string => {
  const previous = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');

  if (isNaN(previous) || isNaN(current)) return '';

  let computation = 0;

  switch (operation) {
    case '+':
      computation = previous + current;
      break;
    case '-':
      computation = previous - current;
      break;
    case '*':
      computation = previous * current;
      break;
    case '÷':
      computation = previous / current;
      break;
  }

  return computation.toString();
};
