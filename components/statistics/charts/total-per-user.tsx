import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { formatCurrency } from '../../../lib/utils/format-number';
import { stringToColor } from '../../../lib/utils/string-to-color';
import { ThemeMode } from '../../../lib/interfaces/common';
import { ChartHeader } from './chart-header';

type Props = {
  data: any;
  value: string;
  currency?: string;
  themeMode: ThemeMode;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const TotalPerUser: React.FC<Props> = ({ data, currency, themeMode, value, setValue }) => {
  const series = [
    {
      name: 'Total',
      data: [], // data?.map((item: any) => item.total),
    },
  ];

  const options: ApexOptions = {
    labels: [], // data?.map((item: any) => item._id),
    colors: [], // data?.map((item: any) => stringToColor(item._id)),
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
      <ChartHeader title="Expenses per period/user" value={value} setValue={setValue} />
      <CardContent>
        <Chart type="bar" height="240px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerUser;
