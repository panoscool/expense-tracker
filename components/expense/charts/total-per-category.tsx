import React from 'react';
import Chart from 'react-apexcharts';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Typography from '@mui/material/Typography';
import { Expense } from '../../../lib/interfaces/expense';
import { capitalizeFirstLetter } from '../../../lib/utils/format-text';
import { formatCurrency } from '../../../lib/utils/format-number';
import { stringToColor } from '../../../lib/utils/string-to-color';

type Props = {
  expenses: Expense[];
  currency?: string;
};

const TotalPerCategory: React.FC<Props> = ({ expenses, currency }) => {
  const totalPerCategory = expenses.reduce((acc: any, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.amount;
    return acc;
  }, {});

  const chartConfig = {
    series: [
      {
        name: 'Amount',
        data: Object.keys(totalPerCategory).map((key) => totalPerCategory[key]),
      },
    ],
    options: {
      labels: Object.keys(totalPerCategory).map(capitalizeFirstLetter),
      colors: Object.keys(totalPerCategory).map(stringToColor),
      plotOptions: {
        bar: {
          columnWidth: '90%',
          barHeight: '100%',
          distributed: true,
        },
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
      legend: {
        show: false,
      },
      noData: {
        text: 'No data available',
      },
    },
  };

  return (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel1b-content" id="panel1b-header">
        <Typography>Total per category</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Chart type="bar" height="240px" series={chartConfig.series} options={chartConfig.options} />
      </AccordionDetails>
    </Accordion>
  );
};

export default TotalPerCategory;
