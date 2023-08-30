import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type DateFieldProps = {
  label: string;
  value: Date | null;
  views?: Array<'day' | 'month' | 'year'>;
  helperText?: string;
  error?: boolean;
  format?: string;
  disableFuture?: boolean;
  openTo?: 'day' | 'month' | 'year';
  onChange: React.Dispatch<any>;
  onBlur?: (inputName: string) => void;
};

const DateField: React.FC<DateFieldProps> = (props) => {
  const { label, value, views, helperText, error, format, disableFuture, openTo, onChange, onBlur } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture={disableFuture}
        format={format || 'dd/MM/yyyy'}
        openTo={openTo}
        views={views}
        label={label}
        value={value}
        slotProps={{
         textField: {
          helperText: helperText,
          error: error,
          onBlur: () => onBlur?.("date")
         }
        }}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
};

export default DateField;
