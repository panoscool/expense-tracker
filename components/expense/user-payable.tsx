import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Expense } from '../../lib/interfaces/expense';
import { formatCurrency } from '../../lib/utils/number-formatter';
import { stringToColor } from '../../lib/utils/string-to-color';
import { getPayableAmountPerUser, getTotalUsers } from '../../lib/utils/expense-calculations';

type Props = {
  expenses: Expense[];
};

const UserPayable: React.FC<Props> = ({ expenses }) => {
  const payablePerUser = getPayableAmountPerUser(expenses || []);

  function userColor(string: string) {
    return { color: stringToColor(string) };
  }

  console.log(getTotalUsers(expenses || []));

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>User payable</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <pre>{JSON.stringify(payablePerUser, null, 2)}</pre>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserPayable;
