import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Expense } from '../../lib/interfaces/expense';
import { getPayableAmountPerUser } from '../../lib/utils/expense-calculations';
import { formatCurrency } from '../../lib/utils/number-formatter';
import { stringToColor } from '../../lib/utils/string-to-color';
import { styled } from '@mui/material/styles';

const Item = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

type Props = {
  expenses: Expense[];
};

const UserPayable: React.FC<Props> = ({ expenses }) => {
  const payablePerUser = getPayableAmountPerUser(expenses || []);

  const getUsersName = Object.keys(payablePerUser).map((userId) => {
    const user = expenses.find((expense) => expense.user._id === userId);

    return {
      id: userId,
      name: user?.user.name,
      amount: payablePerUser[userId],
    };
  });

  const givingUsers = getUsersName.filter((user) => user.amount > 0);
  const receivingUsers = getUsersName.filter((user) => user.amount < 0);

  function userColor(string: string) {
    return { color: stringToColor(string) };
  }

  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Users payable</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="giving users"
                    sx={{ bgcolor: (theme) => theme.palette.error.main }}
                  >
                    <OutboxRoundedIcon />
                  </Avatar>
                }
                title="Giving users"
                subheader="Should give the specified amount"
              />
              <List>
                {givingUsers.map((user) => (
                  <Item key={user.id}>
                    <Typography variant="body1" textTransform="capitalize" {...userColor(user.id)}>
                      <strong>{user.name}</strong>
                    </Typography>
                    <Typography variant="body1">{formatCurrency(user.amount)}</Typography>
                  </Item>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="receiving users"
                    sx={{ bgcolor: (theme) => theme.palette.success.main }}
                  >
                    <MoveToInboxRoundedIcon />
                  </Avatar>
                }
                title="Receiving users"
                subheader="Should receive the specified amount"
              />
              <List>
                {receivingUsers.map((user) => (
                  <Item key={user.id}>
                    <Typography variant="body1" textTransform="capitalize" {...userColor(user.id)}>
                      <strong>{user.name}</strong>
                    </Typography>
                    <Typography variant="body1">{formatCurrency(Math.abs(user.amount))}</Typography>
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

export default UserPayable;
