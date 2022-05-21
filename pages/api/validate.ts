import { AnyObjectSchema } from 'yup';

type YupError = {
  path: string;
  message: string;
};

async function validate<T>(schema: AnyObjectSchema, data: T): Promise<string | undefined> {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err: any) {
    // return err?.inner.map(({ path, message }: YupError) => ({ path, message }));
    return err?.inner.map(({ path, message }: YupError) => `${path}: ${message}`).join(', ');
  }
}

export default validate;
