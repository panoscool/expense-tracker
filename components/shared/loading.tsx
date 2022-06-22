import BaseBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const Backdrop = styled(BaseBackdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));

const Loading: React.FC<{ loading: string[] }> = ({ loading }) => {
  return (
    <Backdrop open={loading.length > 0}>
      <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
    </Backdrop>
  );
};

export default Loading;
