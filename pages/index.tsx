import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CategoryIcon from '../components/shared/category-icon';
import useAppState from '../hooks/use-app-state';

const Home: NextPage = () => {
  const router = useRouter();
  const { auth, loading, accounts, categories } = useAppState();

  useEffect(() => {
    if (!loading && !auth?.id) {
      router.push('/login');
    }
  }, [auth?.id, loading, router]);

  if (loading || !auth?.id) {
    return <p>Loading...</p>;
  }

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Accounts</Typography>
              <Tooltip title="Add account">
                <IconButton>
                  <AddRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <List>
              {accounts?.map((account) => (
                <ListItem
                  disablePadding
                  key={account._id}
                  onClick={handleAccountSelect(account._id)}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {account.users.length > 1 ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                    </ListItemIcon>
                    <ListItemText primary={account.name} secondary={account.description} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <EditRoundedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Categories</Typography>
              <Tooltip title="Add category">
                <IconButton>
                  <AddRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <List>
              {categories?.labels.map((label) => (
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
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
