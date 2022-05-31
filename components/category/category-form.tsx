import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useAppState from '../../hooks/use-app-state';
import useForm from '../../hooks/use-form';
import apiRequest from '../../lib/utils/axios';
import { categorySchema } from '../../lib/utils/yup-schema';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryForm: React.FC = () => {
  const { setModal } = useAppState();
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
    setModal(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      apiRequest('POST', '/category', values);
      handleCloseModal();
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6">Add Category</Typography>
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

        <Box display="flex" alignSelf="flex-end" gap={2}>
          <Button color="primary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default CategoryForm;
