import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chart from 'react-apexcharts';
import { Expense } from '../../../lib/interfaces/expense';
import { getTotalAmountPerUser } from '../../../lib/utils/expense-calculations';
import { stringToColor } from '../../../lib/utils/string-to-color';

type Props = {
  expenses: Expense[];
};

const TotalPerUser: React.FC<Props> = ({ expenses }) => {
  const totalPerUser: { [key: string]: number } = getTotalAmountPerUser(expenses || []);
  const userAmount: number[] = Object.values(totalPerUser);
  const userColor: string[] = Object.keys(totalPerUser).map((key) => stringToColor(key));
  const userName: string[] = Object.keys(totalPerUser).map((key) => {
    const foundUser = expenses.find((expense) => expense.user._id === key);
    return foundUser ? foundUser.user.name : '';
  });

  const chartConfig = {
    series: userAmount,

    chartOptions: {
      colors: userColor,
      labels: userName,
      chart: {
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
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
                  return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                },
              },
            },
          },
        },
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
      noData: {
        text: 'No data available',
      },
    },
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Total per user" />
      <CardContent>
        <Chart
          type="donut"
          height={expenses?.length > 0 ? '275px' : '255px'}
          series={chartConfig.series}
          options={chartConfig.chartOptions}
        />
      </CardContent>
    </Card>
  );
};

export default TotalPerUser;
