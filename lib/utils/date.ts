import { endOfMonth, format, startOfMonth } from 'date-fns';

const currentMonth = new Date().getMonth() + 1;
const start6Months = currentMonth < 7 ? 1 : 7;
const end6Months = currentMonth < 7 ? 6 : 12;

export const getFullDateFromMonth = (month: number) => {
  const year = new Date().getFullYear();
  const date = new Date(year, month, 0);

  return date;
};

export const startOf6Months = startOfMonth(getFullDateFromMonth(start6Months));
export const endOf6Months = endOfMonth(getFullDateFromMonth(end6Months));

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
