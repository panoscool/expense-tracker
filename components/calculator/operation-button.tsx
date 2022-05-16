import Button from '@mui/material/Button';
import { Actions } from '../../hooks/use-calculator';

type OperationButtonProps = {
  dispatch: React.Dispatch<any>;
  operation: string;
};

const OperationButton: React.FC<OperationButtonProps> = ({ dispatch, operation }) => {
  const handleClick = () => {
    dispatch({ type: Actions.OPERATION, payload: { operation } });
  };

  return <Button onClick={handleClick}>{operation}</Button>;
};

export default OperationButton;
