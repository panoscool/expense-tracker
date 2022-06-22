import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const SelectField = styled(TextField)(({ theme }) => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& .MuiListItemText-root': {
    marginTop: 0,
    marginBottom: 0,
  },

  '& .MuiListItemIcon-root': {
    minWidth: theme.spacing(4),
  },

  '& .MuiIconButton-root': {
    paddingTop: 0,
    paddingBottom: 0,

    '& .MuiSvgIcon-root': {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '1rem',
    },
  },
}));

type Props = {
  children: React.ReactNode;
  name: string;
  value: string;
  label: string;
  error?: boolean;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  sx?: React.CSSProperties;
};

const IconSelectField: React.FC<Props> = (props) => {
  const { children, label, value, name, error, helperText, onChange, onBlur, sx } = props;

  return (
    <SelectField
      select
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      sx={sx}
    >
      {children}
    </SelectField>
  );
};

export default IconSelectField;
