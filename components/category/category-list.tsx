import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import useAppContext from '../../hooks/use-app-context';
import { defaultCategories } from '../../lib/config/default-values';
import { deleteCategory, getCategories } from '../../lib/services/category';
import CategoryIcon from '../shared/category-icon';

export const CategoryList = () => {
  const { categories, dispatch } = useAppContext();

  const handleDeleteCategory = (label: string) => async () => {
    if (window.confirm(`Are you sure you want to delete ${label}?`)) {
      if (categories) {
        await deleteCategory(dispatch, { id: categories?._id, label });
        await getCategories(dispatch);
      }
    }
  };

  return (
    <List>
      {categories?.labels.map((label: string) => (
        <ListItem disablePadding key={label}>
          <ListItemIcon>
            <CategoryIcon icon={label} />
          </ListItemIcon>
          <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
          <ListItemSecondaryAction>
            {!defaultCategories.includes(label) && (
              <IconButton disabled={defaultCategories.includes(label)} onClick={handleDeleteCategory(label)}>
                <DeleteRoundedIcon />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
