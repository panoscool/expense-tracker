import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryRounded from '@mui/icons-material/CategoryRounded';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import CategoryIcon from '../components/shared/category-icon';
import useAppContext from '../hooks/use-app-context';
import { styled } from '@mui/material';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  '&.MuiListItemIcon-root': {
    minWidth: '48px',
  },
}));

export default function CategoriesList() {
  const { categories } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CategoryRounded />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories?.labels.map((label) => (
            <ListItem key={label} sx={{ pl: 4 }} disablePadding disableGutters>
              <StyledListItemIcon>
                <CategoryIcon icon={label} />
              </StyledListItemIcon>
              <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
