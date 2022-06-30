import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { createCategory, getCategories } from '../../lib/services/category';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { categorySchema } from '../../lib/config/yup-schema';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  categoryId: string | undefined;
  closeModal: () => void;
};

const CategoryForm: React.FC<Props> = ({ categoryId, closeModal }) => {
  const isDesktop = useIsDesktop();
  const { dispatch } = useAppContext();
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
      if (categoryId) {
        await createCategory(dispatch, { id: categoryId, label: values.label });

        await getCategories(dispatch);

        setValues({ label: '' });
      }
    }
  };

  return (
    <Box m={2} p={2} minWidth={getDialogWidth(isDesktop)}>
      <Box mb={3}>
        <Typography gutterBottom variant="h6">
          Add Category
        </Typography>
      </Box>

      <Form onSubmit={handleSubmit} noValidate>
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
