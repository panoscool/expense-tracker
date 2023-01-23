import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Period, ThemeMode } from '../../../lib/interfaces/common';
import { ChartHeader } from './chart-header';
import { formatDateString } from '../../../lib/utils/date';
import { DayMonth, Quarter, AccountStatistic, Week } from '../../../lib/interfaces/statistics';

type Props = {
  data: AccountStatistic[];
  value: string;
  themeMode: ThemeMode;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function getLabels(period: string, data: any) {
  switch (period) {
    case Period.week:
      return data.map((expense: Week) => expense._id.week);
    case Period.month:
      return data.map((expense: DayMonth) => formatDateString(expense._id, 'MMM yyyy'));
    case Period.quarter:
      return data.map((expense: Quarter) => expense._id.quarter);
    default:
      return data.map((expense: DayMonth) => formatDateString(expense._id, 'dd-MM-yyyy'));
  }
}

function getData(data: AccountStatistic[]) {
  return data.map((expense: AccountStatistic) => expense.count);
}

const TotalPerAccount: React.FC<Props> = ({ data, themeMode, value, setValue }) => {
  const series = [
    {
      name: 'Transactions',
      data: getData(data),
    },
  ];

  const options: ApexOptions = {
    labels: getLabels(value, data),
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
    yaxis: {
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
      <ChartHeader title="Transactions per period" value={value} setValue={setValue} />
      <CardContent>
        <Chart type="area" height="256px" series={series} options={options} />
      </CardContent>
    </Card>
  );
};

export default TotalPerAccount;
