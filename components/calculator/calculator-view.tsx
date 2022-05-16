import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { Actions } from '../../hooks/use-calculator';
import { formatOperand } from '../../utils/number-formatter';
import DigitButton from './digit-button';
import OperationButton from './operation-button';

const CalculatorGrid = styled('div')(({ theme }) => ({
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(4, 4rem)',
  gridTemplateRows: 'minmax(5rem, auto) repeat(5, 3rem)',
  boxShadow: `inset 0px 0px 1px 1px ${alpha(theme.palette.primary.main, 0.1)}`,

  '& > *': {
    boxShadow: `inset 0px 0px 1px 1px ${alpha(theme.palette.secondary.main, 0.1)}`,
  },
}));

const Output = styled('div')(({ theme }) => ({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-around',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.75),
  padding: '0.75rem',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
}));

const PreviousOperand = styled('div')(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.75),
  fontSize: '1.25rem',
}));

const CurrentOperand = styled('div')(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: '2rem',
}));

const ButtonSpan = styled(Button)(({ theme }) => ({
  gridColumn: 'span 2',
}));

type CalculatorViewProps = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  dispatch: React.Dispatch<any>;
};

const CalculatorView: React.FC<CalculatorViewProps> = (props) => {
  const { currentOperand, previousOperand, operation, dispatch } = props;

  const handleClear = () => {
    dispatch({ type: Actions.CLEAR });
  };

  const handleDelete = () => {
    dispatch({ type: Actions.DELETE_DIGIT });
  };

  const handleEvaluate = () => {
    dispatch({ type: Actions.EVALUATE });
  };

  return (
    <CalculatorGrid>
      <Output>
        <PreviousOperand>
          {formatOperand(previousOperand as string)} {operation}
        </PreviousOperand>
        <CurrentOperand>{formatOperand(currentOperand as string)}</CurrentOperand>
      </Output>

      <ButtonSpan onClick={handleClear}>AC</ButtonSpan>
      <Button onClick={handleDelete}>DEL</Button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <ButtonSpan onClick={handleEvaluate}>=</ButtonSpan>
    </CalculatorGrid>
  );
};

export default CalculatorView;
