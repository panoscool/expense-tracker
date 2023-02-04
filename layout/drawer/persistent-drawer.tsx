import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { AccountsList } from '../accounts-list';
import { sxProps } from './drawer-styles';
import { Title } from '../title';
import CategoriesList from '../categories-list';
import { StatisticsButton } from '../statistics-button';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

interface Props {
  open: boolean;
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export function PersistentDrawer({ open, toggleDrawer }: Props) {
  return (
    <Drawer sx={sxProps} variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <Box p={1.5}>
          <Title />
        </Box>

        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <AccountsList />

      <Divider />
      <StatisticsButton />

      <Divider />
      <CategoriesList />
    </Drawer>
  );
}
