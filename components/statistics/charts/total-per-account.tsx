import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { format, parseISO } from 'date-fns';
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { formatCurrency } from '../../../lib/utils/format-number';

type Props = {
  data: any;
  currency?: string;
};

const TotalPerAccount: React.FC<Props> = ({ data, currency }) => {
  const series = [
    {
      name: 'Total',
      data: data?.map((item: any) => item.total),
    },
  ];

  const options: ApexOptions = {
    labels: data?.map((item: any) => format(parseISO(item._id), 'MMMM yyyy')),
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
      enabled: false,
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
      <CardHeader title="Total per month" />
      <CardContent>
        <Chart type="area" height="240px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerAccount;
