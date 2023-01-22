import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Box, ListItemIcon, ListItemText, MenuItem, TextField } from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import { QueryParams } from '../../lib/interfaces/common';
import { ExpensesFilters } from '../../lib/interfaces/expense';
import { setParams } from '../../lib/utils/url-params';
import CategoryIcon from '../shared/category-icon';
import DateField from '../shared/date-field';
import IconSelectField from '../shared/icon-select-field';

export const ExpenseFilters: React.FC = () => {
  const router = useRouter();
  const { account, categories } = useAppContext();
  const [filterBy, setFilterBy] = useState<string>('date');
  const [filters, setFilters] = useState<ExpensesFilters>({
    date: new Date(),
    user_id: 'all',
    category: 'all',
  });

  const { date, user_id, category }: QueryParams = router.query;

  useEffect(() => {
    if (date) {
      setFilters((prevFilters) => ({ ...prevFilters, date: new Date(date) }));
    }
    if (user_id) {
      setFilters((prevFilters) => ({ ...prevFilters, user_id }));
    }
    if (category) {
      setFilters((prevFilters) => ({ ...prevFilters, category }));
    }

    return () => {
      setFilters({ date: new Date(), user_id: 'all', category: 'all' });
    };
  }, [user_id, date, category]);

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  const handleChangeFilterBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(event.target.value);
  };

  const handleChange = (value: string | Date | null) => {
    if (filterBy === 'date' && value) {
      setParams({ [filterBy]: formatDate(value as Date) });
    } else {
      setParams({ date: formatDate(filters.date), [filterBy]: value });
    }
  };

  const filterOptions: { value: string; label: string }[] = [
    { value: 'date', label: 'Date' },
    ...(account && account.users.length > 1 ? [{ value: 'user_id', label: 'User' }] : []),
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
          value={filters.date}
          onChange={handleChange}
        />
      )}
      {filterBy === 'user_id' && (
        <TextField
          select
          name="user_id"
          label="User"
          value={filters.user_id || ''}
          onChange={(event) => handleChange(event.target.value)}
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
          value={filters.category || ''}
          onChange={(event) => handleChange(event.target.value)}
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
