import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/x-date-pickers';

type DateFieldProps = {
  label: string;
  value: Date | null;
  views?: CalendarPickerView[];
  helperText?: string;
  error?: boolean;
  format?: string;
  disableFuture?: boolean;
  onChange: React.Dispatch<any>;
  onBlur?: (inputName: string) => void;
};

const DateField: React.FC<DateFieldProps> = (props) => {
  const { label, value, views, helperText, error, format, disableFuture, onChange, onBlur } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture={disableFuture}
        inputFormat={format || 'dd/MM/yyyy'}
        views={views}
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            onBlur={() => onBlur?.('date')}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
