import { styled } from '@mui/material/styles';
import { useAppContext } from '../../context/app-context';
import useForm from '../../hooks/use-form';
import { createCategory, getCategories } from '../../lib/services/category';
import { categorySchema } from '../../lib/config/yup-schema';
import { Box, Button, TextField, Typography, Dialog, DialogContent } from '@mui/material';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CategoryForm: React.FC<Props> = ({ open, onClose }) => {
  const { categories, dispatch } = useAppContext();
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
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      if (categories?._id) {
        await createCategory(dispatch, { id: categories?._id, label: values.label });
        await getCategories(dispatch);

        setValues({ label: '' });
      }
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};
