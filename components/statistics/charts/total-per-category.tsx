import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Chart from 'react-apexcharts';
import { groupBy } from 'lodash';
import { ApexOptions } from 'apexcharts';
import { formatCurrency } from '../../../lib/utils/format-number';
import { ThemeMode } from '../../../lib/interfaces/common';
import { Typography } from '@mui/material';
import { CategoryStatistic } from '../../../lib/interfaces/statistics';
import { formatDateString } from '../../../lib/utils/date';

type Props = {
  data: CategoryStatistic[];
  currency?: string;
  themeMode: ThemeMode;
};

const TotalPerCategory: React.FC<Props> = ({ data, currency, themeMode }) => {
  const groupedByDate = groupBy(data, (d) => d._id.date);
  const dates = Object.keys(groupedByDate);
  const series = dates.map((date) => {
    return {
      name: formatDateString(date, 'MMM-yyyy'),
      data: groupedByDate[date].map((category) => category.total_amount),
    };
  });
  const labels = dates.map((date) => groupedByDate[date].map((category) => category._id.category)).flat();
  const uniqueLabels = [...new Set(labels)];

  const options: ApexOptions = {
    labels: uniqueLabels,
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
      show: true,
      position: 'top',
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
      <Typography variant="h6" p={2}>
        Expenses per month/category
      </Typography>
      <CardContent>
        <Chart type="area" height="340px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerCategory;
