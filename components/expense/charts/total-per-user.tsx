import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Expense } from '../../../lib/interfaces/expense';
import { getTotalAmountPerUser } from '../../../lib/utils/expense-calculations';
import { formatCurrency } from '../../../lib/utils/format-number';
import { stringToColor } from '../../../lib/utils/string-to-color';

type Props = {
  themeMode: 'light' | 'dark';
  expenses: Expense[];
  currency?: string;
};

const TotalPerUser: React.FC<Props> = ({ themeMode, expenses, currency }) => {
  const totalPerUser: { [key: string]: number } = getTotalAmountPerUser(expenses || []);
  const userAmount: number[] = Object.values(totalPerUser);
  const userColor: string[] = Object.keys(totalPerUser).map(stringToColor);
  const userName: string[] = Object.keys(totalPerUser).map((key) => {
    const foundUser = expenses.find((expense) => expense.user._id === key);
    return foundUser ? foundUser.user.name : '';
  });

  const chartOptions: ApexOptions = {
    colors: userColor,
    labels: userName,
    theme: {
      mode: themeMode,
    },
    chart: {
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              formatter: function (w: any) {
                const val = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);

                return formatCurrency(val, currency);
              },
            },
          },
        },
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
    noData: {
      text: 'No data available',
    },
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Total per user" />
      <CardContent>
        <Chart
          type="donut"
          height={expenses?.length > 0 ? '275px' : '255px'}
          series={userAmount}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  );
};

export default TotalPerUser;
