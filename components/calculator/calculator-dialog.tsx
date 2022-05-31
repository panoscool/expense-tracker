import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import useCalculator, { Actions } from '../../hooks/use-calculator';
import CalculatorView from './calculator-view';

type CalculatorDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (currentOperand: string | null) => void;
};

const CalculatorDialog: React.FC<CalculatorDialogProps> = ({ open, onClose, onConfirm }) => {
  const { currentOperand, previousOperand, operation, dispatch } = useCalculator();

  const handleConfirm = () => {
    onConfirm(currentOperand);
    dispatch({ type: Actions.CLEAR });
    onClose();
  };

  return (
    <Dialog open={open}>
      <Box padding={1}>
        <CalculatorView
          currentOperand={currentOperand}
          previousOperand={previousOperand}
          operation={operation}
          dispatch={dispatch}
        />
      </Box>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button color="inherit" onClick={handleConfirm}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalculatorDialog;
