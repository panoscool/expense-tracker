import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Typography from '@mui/material/Typography';
import { Expense } from '../../../lib/interfaces/expense';
import { capitalizeFirstLetter } from '../../../lib/utils/format-text';
import { formatCurrency } from '../../../lib/utils/format-number';
import { ThemeMode } from '../../../lib/interfaces/common';

type Props = {
  themeMode: ThemeMode;
  expenses: Expense[];
  currency?: string;
};

const TotalPerCategory: React.FC<Props> = ({ themeMode, expenses, currency }) => {
  const totalPerCategory = expenses.reduce((acc: any, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.amount;
    return acc;
  }, {});

  const series = [
    {
      name: 'Amount',
      data: Object.keys(totalPerCategory).map((key) => totalPerCategory[key]),
    },
  ];

  const options: ApexOptions = {
    labels: Object.keys(totalPerCategory).map(capitalizeFirstLetter),
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
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel1b-content" id="panel1b-header">
        <Typography>Total per category</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Chart type="bar" height="240px" series={series} options={options} />
      </AccordionDetails>
    </Accordion>
  );
};

export default TotalPerCategory;
