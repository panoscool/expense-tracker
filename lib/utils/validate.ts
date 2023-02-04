import { AnyObjectSchema } from 'yup';

type YupError = {
  path: string;
  message: string;
};

export async function validate<T>(schema: AnyObjectSchema, data: T): Promise<string | undefined> {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err: any) {
    // return err?.inner.map(({ path, message }: YupError) => ({ path, message }));
    return err?.inner.map(({ path, message }: YupError) => `${path}: ${message}`).join(', ');
  }
}

export const isDigit = (value: string) => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

  return digits.includes(value);
};

export const isOperator = (value: string) => {
  const operators = ['+', '-', '*', '/'];

  return operators.includes(value);
};

export const isEvaluate = (value: string) => {
  const evaluations = ['=', 'Enter'];

  return evaluations.includes(value);
};

export const isBackspace = (value: string) => {
  return ['Delete', 'Backspace'].includes(value);
};

export const isClear = (value: string) => {
  return ['Escape'].includes(value);
};
