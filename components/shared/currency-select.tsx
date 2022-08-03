import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import currencies from '../../lib/data/currencies.json';

type Currencies = {
  value: string;
  label: string;
};

type Props = {
  selectedValue: string;
  onChange: (value: Currencies | null) => void;
  onBlur: () => void;
  error: boolean;
  helperText?: string;
};

const options = Object.keys(currencies).map((key) => ({
  value: key,
  // @ts-ignore
  label: currencies[key],
}));

const CurrencySelect: React.FC<Props> = ({ selectedValue, onChange, onBlur, error, helperText }) => {
  const [value, setValue] = useState<Currencies | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const found = options.find((option) => option.value === selectedValue);

    if (found) {
      setValue(found);
    }
  }, [selectedValue]);

  const handleChange = (newValue: Currencies | null) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(event: any, newValue: Currencies | null) => {
        handleChange(newValue);
      }}
      inputValue={inputValue || ''}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onBlur={onBlur}
      options={options}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => <TextField {...params} label="Currency" error={error} helperText={helperText} />}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <div>
            <Typography>{option.value}</Typography>
            <Typography variant="caption">{option.label}</Typography>
          </div>
        </Box>
      )}
    />
  );
};

export default CurrencySelect;
