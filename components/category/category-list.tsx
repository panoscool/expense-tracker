import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import { defaultCategories } from '../../lib/config/default-values';
import { deleteCategory } from '../../lib/services/category';
import CategoryIcon from '../shared/category-icon';
import CategoryForm from './category-form';

const CategoryList = () => {
  const [showForm, setShowForm] = useState(false);
  const { categories, dispatch } = useAppContext();

  const handleOpenModal = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleDeleteCategory = (label: string) => async () => {
    if (window.confirm(`Are you sure you want to delete ${label}?`)) {
      if (categories) {
        await deleteCategory(dispatch, { id: categories?._id, label });
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Categories</Typography>
        <Tooltip title="Add category">
          <IconButton onClick={handleOpenModal}>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {categories?.labels.map((label: string) => (
          <ListItem disablePadding key={label}>
            <ListItemIcon>
              <CategoryIcon icon={label} />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            <ListItemSecondaryAction>
              {!defaultCategories.includes(label) && (
                <IconButton
                  disabled={defaultCategories.includes(label)}
                  onClick={handleDeleteCategory(label)}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={showForm}>
        <CategoryForm categoryId={categories?._id} closeModal={handleCloseModal} />
      </Dialog>
    </Box>
  );
};

export default CategoryList;
