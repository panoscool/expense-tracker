import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DateFieldProps = {
  label: string;
  value: Date | null;
  helperText?: string;
  error?: boolean;
  onChange: React.Dispatch<any>;
  onBlur: (inputName: string) => void;
};

const DateField: React.FC<DateFieldProps> = (props) => {
  const { label, value, helperText, error, onChange, onBlur } = props;

  const setValue = (date: Date | null) => {
    onChange((prevState: any) => ({ ...prevState, date }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        inputFormat="dd/MM/yyyy"
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            onBlur={() => onBlur('date')}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
