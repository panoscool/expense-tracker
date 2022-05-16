import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import Drawer from '@mui/material/Drawer';

type NavDrawerProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const NavDrawer: React.FC<NavDrawerProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer anchor="left" variant="temporary" open={open} onClose={toggleDrawer(false)}>
      <Box width={250}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Private" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderSharedRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Shared" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
