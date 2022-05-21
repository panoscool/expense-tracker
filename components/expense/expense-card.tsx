import { alpha, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { formatCurrency } from '../../lib/utils/number-formatter';
import CategoryIcon from '../shared/category-icon';

const TotalAmount = styled(Typography)`
  padding-right: 24px;
`;

const ExpenseCard: React.FC<{ day: any }> = ({ day }) => {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        avatar={<Avatar aria-label="day">13</Avatar>}
        action={
          <TotalAmount variant="h6" color="secondary">
            {formatCurrency(1000)}
          </TotalAmount>
        }
        title="Friday"
        subheader="May 2022"
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
                  <ListItemText primary={d.comment} secondary={d.name} />
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
