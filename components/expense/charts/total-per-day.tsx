import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { format, parseISO } from 'date-fns';
import React from 'react';
import Chart from 'react-apexcharts';
import { Expense } from '../../../lib/interfaces/expense';
import { formatCurrency } from '../../../lib/utils/number-formatter';

type Props = {
  days: Expense[][];
  dates: string[];
};

const TotalPerDay = ({ days, dates }: Props) => {
  const totalPerDay = days.map((day: Expense[]) => {
    return day.reduce((acc, curr) => acc + curr.amount, 0);
  });

  const chartConfig = {
    series: [
      {
        name: 'Total',
        data: totalPerDay,
      },
    ],
    options: {
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
        width: 1,
      },
      tooltip: {
        theme: 'light',
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
            return formatCurrency(val);
          },
        },
      },
      noData: {
        text: 'No data available',
      },
    },
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Total per day" />
      <CardContent>
        <Chart
          type="area"
          height="240px"
          series={chartConfig.series}
          options={chartConfig.options}
        />
      </CardContent>
    </Card>
  );
};

export default TotalPerDay;
