import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import Chart from 'react-apexcharts';
import { IExpense } from '../../../lib/models/expense';

type Props = {
  days: IExpense[][];
  dates: string[];
};

const TotalPerDay = ({ days, dates }: Props) => {
  const totalPerDay = days.map((day: IExpense[]) => {
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
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: -10,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        categories: dates?.map((date) => date),
      },
      yaxis: {
        labels: {
          show: false,
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      legend: {
        show: true,
      },
    },
  };

  if (!days?.length) return null;

  return (
    <Card variant="outlined">
      <CardHeader title="Total per day" />
      <CardContent>
        <Chart
          type="area"
          height="180px"
          series={chartConfig.series}
          options={chartConfig.options}
        />
      </CardContent>
    </Card>
  );
};

export default TotalPerDay;
