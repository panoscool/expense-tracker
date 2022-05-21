import { useEffect, useState } from 'react';
import { AnyObjectSchema } from 'yup';

type Error = { path: string; message: string };
type Touched = { [key: string]: boolean };

const useForm = (schema: AnyObjectSchema, initState: any = {}) => {
  const [values, setValues] = useState(initState);
  const [touched, setTouched] = useState<Touched>({});
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    setErrors([]);

    schema
      .validate(values, { abortEarly: false, context: { value: values } })
      .catch((err: { inner: React.SetStateAction<Error[]> }) => setErrors(err.inner));
  }, [schema, values]);

  const onBlur = (inputName: string) => {
    setTouched({ ...touched, [inputName]: true });
  };

  const handleTouched = () => {
    if (errors.length > 0) {
      errors.forEach((err: Error) => {
        setTouched((prevState) => ({ ...prevState, [err.path]: true }));
      });
    }
  };

  const canSubmit = (): boolean => {
    handleTouched();

    return errors.length === 0;
  };

  const hasError = (path: string): Error | undefined => {
    let touchedPath;
    const error = errors.find((fld) => fld.path === path);

    Object.keys(touched).forEach((key) => {
      if (key === path && touched[key]) {
        touchedPath = touched[key];
      }
    });

    return touchedPath ? error : undefined;
  };

  return { values, setValues, onBlur, hasError, canSubmit };
};

export default useForm;
