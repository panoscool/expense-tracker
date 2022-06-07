import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CategoryIcon from '../shared/category-icon';
import { useCallback, useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';
import Loading from '../shared/loading';

const CategoryList = () => {
  const [categories, fetchCategories, loadingCategories, error] = useFetch();

  const getCategories = useCallback(async () => {
    await fetchCategories('GET', '/category');
  }, [fetchCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Box>
      <Typography color="error">{error}</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Categories</Typography>
        <Tooltip title="Add category">
          <IconButton>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {categories?.labels.map((label: string) => (
          <ListItem disablePadding key={label}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon icon={label} />
              </ListItemIcon>
              <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Loading loading={loadingCategories} />
    </Box>
  );
};

export default CategoryList;
