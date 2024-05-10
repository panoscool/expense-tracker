import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ApexOptions } from 'apexcharts';
import { isSameMonth } from 'date-fns';
import React from 'react';
import Chart from 'react-apexcharts';
import { ThemeMode } from '../../../lib/interfaces/common';
import { CategoryStatistic } from '../../../lib/interfaces/statistics';
import { formatDateString } from '../../../lib/utils/date';
import { getStatisticsGroupedByDay } from '../../../lib/utils/expense-calculations';
import { formatCurrency } from '../../../lib/utils/format-number';
import { stringToColor } from '../../../lib/utils/string-to-color';
import DateField from '../../shared/date-field';

type Props = {
  data: CategoryStatistic[];
  currency?: string;
  themeMode: ThemeMode;
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
};

const TotalPerCategory: React.FC<Props> = ({ data, currency, themeMode, month, setMonth }) => {
  const groupedByDate = getStatisticsGroupedByDay(data);
  const [currentMonth] = Object.keys(groupedByDate).filter((date) => isSameMonth(new Date(date), month));

  const series = [
    {
      name: formatDateString(currentMonth, 'MMM-yyyy'),
      data: groupedByDate[currentMonth]?.map((category) => +category.total_amount.toFixed(2)) || [],
    },
  ];

  const labels = groupedByDate[currentMonth]?.map((category) => category._id.category) || [];

  const options: ApexOptions = {
    labels: labels,
    colors: labels.map(stringToColor),
    theme: {
      mode: themeMode,
    },
    chart: {
      toolbar: {
        show: true,
      },
    },
    grid: {
      show: true,
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '90%',
        barHeight: '100%',
        distributed: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val: number) {
          return formatCurrency(val, currency);
        },
      },
    },
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    noData: {
      text: 'No data available',
    },
  };

  return (
    <Card variant="outlined">
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h6">Expenses per category</Typography>
        <DateField
          disableFuture
          openTo="month"
          views={['year', 'month']}
          format="MMMM yyyy"
          label="Date"
          value={month}
          onChange={setMonth}
        />
      </Box>
      <CardContent>
        <Chart type="bar" height="340px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerCategory;
