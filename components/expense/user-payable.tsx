import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import { Alert, Button, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import { useAppContext } from '../../context/app-context';
import { updatePayment } from '../../lib/services/payment';
import { formatCurrency } from '../../lib/utils/format-number';

const Item = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const UserPayable: React.FC = () => {
  const { payments, account, dispatch } = useAppContext();

  const handleUpdateSettled = async () => {
    if (payments) {
      await updatePayment(dispatch, { ...payments, settled: !payments.settled });
    }
  };

  return (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Users payable</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Alert
          sx={{ mb: 3 }}
          severity={payments?.settled ? 'success' : 'info'}
          action={
            <Button variant="outlined" color="inherit" size="small" onClick={handleUpdateSettled}>
              {payments?.settled ? 'unsettle' : 'settle'}
            </Button>
          }
        >
          The period {payments?.period} {payments?.settled ? 'is settled' : 'is unsettled'}.
        </Alert>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar aria-label="giving users" sx={{ bgcolor: (theme) => theme.palette.error.main }}>
                    <OutboxRoundedIcon />
                  </Avatar>
                }
                title="Giving users"
                subheader="Should give the specified amount"
              />
              <List>
                {payments?.giving_users.map((giv) => (
                  <Item key={giv.user._id}>
                    <Typography variant="body1" textTransform="capitalize">
                      {giv.user.name}
                    </Typography>
                    <Typography variant="body1">{formatCurrency(giv.amount, account?.currency)}</Typography>
                  </Item>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar aria-label="receiving users" sx={{ bgcolor: (theme) => theme.palette.success.main }}>
                    <MoveToInboxRoundedIcon />
                  </Avatar>
                }
                title="Receiving users"
                subheader="Should receive the specified amount"
              />
              <List>
                {payments?.receiving_users.map((rec) => (
                  <Item key={rec.user._id}>
                    <Typography variant="body1" textTransform="capitalize">
                      {rec.user.name}
                    </Typography>
                    <Typography variant="body1">{formatCurrency(Math.abs(rec.amount), account?.currency)}</Typography>
                  </Item>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
