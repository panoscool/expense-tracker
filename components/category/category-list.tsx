import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import useFetch from '../../hooks/use-fetch';
import CategoryIcon from '../shared/category-icon';
import Loading from '../shared/loading';
import CategoryForm from './category-form';

const CategoryList = () => {
  const [categories, fetchCategories, loadingCategories, error] = useFetch();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    await fetchCategories('GET', '/category');
  }, [fetchCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryEdit = (category: string) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleOpenModal = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  return (
    <Box>
      <Typography color="error">{error}</Typography>

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
          <ListItem disablePadding key={label} onClick={handleCategoryEdit(label)}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon icon={label} />
              </ListItemIcon>
              <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={showForm}>
        <CategoryForm
          selectedCategory={selectedCategory}
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      </Dialog>

      <Loading loading={loadingCategories} />
    </Box>
  );
};

export default CategoryList;
