import BaseBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

const Backdrop = styled(BaseBackdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));

const Loading: React.FC<{ loading: string[] }> = ({ loading }) => {
  const isLoading = useMemo(() => Boolean(loading.length), [loading.length]);

  if (!isLoading) return null;

  return (
    <Backdrop open={isLoading}>
      <CircularProgress sx={{ color: (theme) => theme.palette.common.white }} />
    </Backdrop>
  );
};

export default Loading;
