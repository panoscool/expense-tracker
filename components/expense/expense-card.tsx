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
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Expense } from '../../lib/interfaces/expense';
import { formatDateString } from '../../lib/utils/date';
import { formatCurrency } from '../../lib/utils/format-number';
import { stringToColor } from '../../lib/utils/string-to-color';
import CategoryIcon from '../shared/category-icon';

const TotalAmount = styled(Typography)`
  padding-right: 24px;
`;

type Props = {
  day: Expense[];
  date: string;
  users: number;
  currency?: string;
};

export const ExpenseCard: React.FC<Props> = ({ day, date, currency, users }) => {
  const router = useRouter();

  const handleExpenseClick = (id: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, expense_id: id },
      hash: 'edit',
    });
  };

  const totalAmount = day.reduce((acc, expense) => acc + expense.amount, 0);

  function avatarColor(dayString: string) {
    return { sx: { bgcolor: stringToColor(dayString) } };
  }

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="day" {...avatarColor(formatDateString(date, 'EEEE'))}>
            {formatDateString(date, 'dd')}
          </Avatar>
        }
        action={<TotalAmount variant="h6">{formatCurrency(totalAmount, currency)}</TotalAmount>}
        title={formatDateString(date, 'EEEE')}
        subheader={formatDateString(date, 'MMMM yyyy')}
        sx={{ backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05) }}
      />

      <Divider />

      <CardContent>
        <List disablePadding>
          {day.map((expense: Expense, index: number) => (
            <Fragment key={index}>
              <ListItem disableGutters onClick={() => handleExpenseClick(expense._id)}>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon icon={expense.category} />
                  </ListItemIcon>
                  <ListItemText
                    primary={expense.description}
                    secondary={users > 1 ? expense.user.name : expense.category}
                    sx={{ textTransform: 'capitalize' }}
                  />
                  <ListItemSecondaryAction>
                    <Typography>{formatCurrency(expense.amount, currency)}</Typography>
                  </ListItemSecondaryAction>
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
