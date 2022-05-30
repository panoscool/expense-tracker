import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import { Fragment } from 'react';
import { IExpense } from '../../lib/models/expense';
import { formatCurrency } from '../../lib/utils/number-formatter';
import { stringToColor } from '../../lib/utils/string-to-color';
import CategoryIcon from '../shared/category-icon';

const TotalAmount = styled(Typography)`
  padding-right: 24px;
`;

const ExpenseCard: React.FC<{ day: IExpense[]; date: string }> = ({ day, date }) => {
  if (!day.length) return null;

  const formattedDate = (fmt: string) => {
    return format(parseISO(date), fmt);
  };

  const totalAmount = day.reduce((acc, expense) => acc + expense.amount, 0);

  function stringAvatar(dayString: string) {
    return { sx: { bgcolor: stringToColor(dayString) } };
  }

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="day" {...stringAvatar(formattedDate('EEEE'))}>
            {formattedDate('dd')}
          </Avatar>
        }
        action={
          <TotalAmount variant="h6" color="secondary">
            {formatCurrency(totalAmount)}
          </TotalAmount>
        }
        title={formattedDate('EEEE')}
        subheader={formattedDate('MMMM yyyy')}
        sx={{ backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05) }}
      />
      <Divider />
      <CardContent>
        <List disablePadding>
          {day.map((d: any, index: number) => (
            <Fragment key={index}>
              <ListItem disableGutters>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon icon={d.category} />
                  </ListItemIcon>
                  <ListItemText primary={d.note} secondary={d.user.name} />
                  <ListItemSecondaryAction>{formatCurrency(d.amount)}</ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
              {index === day.length - 1 ? null : <Divider component="li" />}
            </Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
