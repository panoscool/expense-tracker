import { Box, ListItemIcon, ListItemText, MenuItem, TextField } from '@mui/material';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Account } from '../../lib/interfaces/account';
import { Category } from '../../lib/interfaces/category';
import CategoryIcon from '../shared/category-icon';
import DateField from '../shared/date-field';
import IconSelectField from '../shared/IconSelectField';
import { ExpensesFilters } from '../../lib/interfaces/expense';

type Props = {
  filterBy: string;
  account: Account | null;
  categories: Category | null;
  state: ExpensesFilters;
  onFilterByChange: React.Dispatch<React.SetStateAction<string>>;
  onStateChange: React.Dispatch<React.SetStateAction<ExpensesFilters>>;
};

const ExpenseFilters: React.FC<Props> = (props) => {
  const { filterBy, account, categories, state, onFilterByChange, onStateChange } = props;

  const handleChangeFilterBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByChange(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStateChange((prevState: any) => ({ ...prevState, [filterBy]: event.target.value }));
  };

  const filterOptions: { value: string; label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'user_id', label: 'User' },
    { value: 'category', label: 'Category' },
  ];

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <TextField
        select
        name="filterBy"
        label="Filter by"
        value={filterBy}
        onChange={handleChangeFilterBy}
        sx={{ minWidth: '160px' }}
      >
        {filterOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {filterBy === 'date' && (
        <DateField
          disableFuture
          views={['year', 'month']}
          format="MMMM yyyy"
          label="Date"
          value={state.date}
          onChange={onStateChange}
        />
      )}
      {filterBy === 'user_id' && (
        <TextField
          select
          name="user_id"
          label="User"
          value={state.user_id || ''}
          onChange={handleChange}
          sx={{ minWidth: '160px' }}
        >
          <MenuItem value="all">All</MenuItem>
          {account?.users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {filterBy === 'category' && (
        <IconSelectField
          name="category"
          label="Category"
          value={state.category || ''}
          onChange={handleChange}
          sx={{ minWidth: '160px' }}
        >
          <MenuItem value="all">
            <ListItemIcon>
              <ListAltOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="All" />
          </MenuItem>
          {categories?.labels.map((label) => (
            <MenuItem key={label} value={label}>
              <ListItemIcon>
                <CategoryIcon icon={label} size="small" />
              </ListItemIcon>
              <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            </MenuItem>
          ))}
        </IconSelectField>
      )}
    </Box>
  );
};

export default ExpenseFilters;
