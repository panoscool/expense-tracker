import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function StatisticsButton() {
  const router = useRouter();

  const accountId = router.query?.account_id;

  return (
    <List disablePadding>
      <ListItem disablePadding disableGutters>
        <ListItemButton component={Link} href={`/statistics${accountId ? `?account_id=${accountId}` : ''}`}>
          <ListItemIcon>
            <QueryStatsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
