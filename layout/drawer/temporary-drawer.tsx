import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { AccountsList } from '../accounts-list';
import { sxProps } from './drawer-styles';
import { Title } from '../title';
import CategoriesList from '../categories-list';

interface Props {
  open: boolean;
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export function TemporaryDrawer({ open, toggleDrawer }: Props) {
  return (
    <Drawer sx={sxProps} variant="temporary" anchor="left" open={open} onClose={toggleDrawer}>
      <Box p={1.5} textAlign="center">
        <Title />
      </Box>
      <Divider />
      <AccountsList />

      <Divider />
      <CategoriesList />
    </Drawer>
  );
}
