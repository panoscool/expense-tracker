import Button from '@mui/material/Button';
import { Actions } from '../../lib/interfaces/calculator';

type OperationButtonProps = {
  dispatch: React.Dispatch<any>;
  operation: string;
};

export const OperationButton: React.FC<OperationButtonProps> = ({ dispatch, operation }) => {
  const handleClick = () => {
    dispatch({ type: Actions.OPERATION, payload: { operation } });
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      {operation}
    </Button>
  );
};
