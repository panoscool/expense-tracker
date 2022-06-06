import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const EmptyList: React.FC<{ msg?: string }> = ({ msg }) => {
  return (
    <Box display="flex" alignContent="center" justifyContent="center" gap={1}>
      <SearchRoundedIcon color="disabled" />
      <Typography variant="body1" color="textSecondary">
        {msg || 'No results found!'}
      </Typography>
    </Box>
  );
};

export default EmptyList;
