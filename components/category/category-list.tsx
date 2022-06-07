import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import useFetch from '../../hooks/use-fetch';
import { Category } from '../../lib/interfaces/category';
import CategoryIcon from '../shared/category-icon';
import Loading from '../shared/loading';
import CategoryForm from './category-form';
import { defaultCategories } from '../../lib/config/default-values';

const CategoryList = () => {
  const [categories, fetchCategories, loadingCategories, error] = useFetch();
  const [, deleteCategory, , deleteError] = useFetch();
  const [showForm, setShowForm] = useState(false);

  const getCategories = useCallback(async () => {
    await fetchCategories('GET', '/category');
  }, [fetchCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryEdit = () => {
    setShowForm(true);
  };

  const handleOpenModal = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleDeleteCategory = (label: string) => async () => {
    await deleteCategory('DELETE', `/category/${categories._id}`, { label });
    getCategories();
  };

  return (
    <Box>
      <Typography color="error">{error || deleteError}</Typography>

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
              <IconButton
                disabled={defaultCategories.includes(label)}
                onClick={handleDeleteCategory(label)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={showForm}>
        <CategoryForm
          categoryId={categories?._id}
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      </Dialog>

      <Loading loading={loadingCategories} />
    </Box>
  );
};

export default CategoryList;
