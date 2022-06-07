import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useFetch from '../../hooks/use-fetch';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { categorySchema } from '../../lib/utils/yup-schema';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  categoryId: string | undefined;
  closeModal: () => void;
  getCategories: () => void;
};

const CategoryForm: React.FC<Props> = ({ categoryId, closeModal, getCategories }) => {
  const { isDesktop } = useIsDesktop();
  const [, createCategory, , error] = useFetch();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(categorySchema, {
    label: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleCloseModal = () => {
    setValues({ label: '' });
    closeModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      await createCategory('PUT', `/category/${categoryId}`, values);

      setValues({ label: '' });
      getCategories();
    }
  };

  return (
    <Box m={2} p={2} minWidth={isDesktop ? 320 : 'auto'}>
      <Box mb={3}>
        <Typography gutterBottom variant="h6">
          Add Category
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>

      <Form onSubmit={handleSubmit}>
        <TextField
          name="label"
          label="Category"
          value={values.label || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('label')}
          helperText={hasError('label')?.message}
        />

        <Box display="flex" alignSelf="center" gap={2} mt={3}>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default CategoryForm;
