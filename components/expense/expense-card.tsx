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
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { IExpense } from '../../lib/models/expense';
import { formatCurrency } from '../../lib/utils/number-formatter';
import { stringToColor } from '../../lib/utils/string-to-color';
import CategoryIcon from '../shared/category-icon';

const TotalAmount = styled(Typography)`
  padding-right: 24px;
`;

type Props = {
  day: IExpense[];
  date: string;
  onSelectExpense: (expense: IExpense) => void;
  onOpenModal: (modal: string) => void;
};

const ExpenseCard: React.FC<Props> = ({ day, date, onSelectExpense, onOpenModal }) => {
  if (!day.length) return null;

  const handleExpenseClick = (expense: IExpense) => {
    onSelectExpense(expense);
    onOpenModal('expense-form');
  };

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
          <TotalAmount variant="h6" color="primary">
            {formatCurrency(totalAmount)}
          </TotalAmount>
        }
        title={formattedDate('EEEE')}
        subheader={formattedDate('MMMM yyyy')}
        sx={{ backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03) }}
      />
      <Divider />
      <CardContent>
        <List disablePadding>
          {day.map((d: IExpense, index: number) => (
            <Fragment key={index}>
              <ListItem disableGutters onClick={() => handleExpenseClick(d)}>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon icon={d.category} />
                  </ListItemIcon>
                  <ListItemText primary={d.note} secondary={(d.user as any).name} />
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
