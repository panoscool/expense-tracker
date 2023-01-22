import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { format, parseISO } from 'date-fns';
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Expense } from '../../../lib/interfaces/expense';
import { formatCurrency } from '../../../lib/utils/format-number';
import { ThemeMode } from '../../../lib/interfaces/common';

type Props = {
  themeMode: ThemeMode;
  days: Expense[][];
  dates: string[];
  currency?: string;
};

const TotalPerDay: React.FC<Props> = ({ themeMode, days, dates, currency }) => {
  const totalPerDay = days.map((day: Expense[]) => {
    return day.reduce((acc, curr) => acc + curr.amount, 0);
  });

  const series = [
    {
      name: 'Total',
      data: totalPerDay,
    },
  ];

  const options: ApexOptions = {
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
    },
    legend: {
      show: true,
    },
    xaxis: {
      labels: {
        show: true,
        formatter: function (val: string) {
          return val ? format(parseISO(val), 'dd/MMM') : '';
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
      categories: dates?.map((date) => date),
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val: number) {
          return formatCurrency(val, currency);
        },
      },
    },
    noData: {
      text: 'No data available',
    },
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Total per day" />
      <CardContent>
        <Chart type="area" height="240px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerDay;
