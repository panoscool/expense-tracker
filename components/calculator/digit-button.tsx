import Button from '@mui/material/Button';
import { Actions } from '../../lib/interfaces/calculator';

type DigitButtonProps = {
  dispatch: React.Dispatch<any>;
  digit: string;
};

export const DigitButton: React.FC<DigitButtonProps> = ({ dispatch, digit }) => {
  const handleClick = () => {
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit } });
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      {digit}
    </Button>
  );
};
