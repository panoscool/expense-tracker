import BaseBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const Backdrop = styled(BaseBackdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <Backdrop open={loading}>
      {loading && <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />}
    </Backdrop>
  );
}
