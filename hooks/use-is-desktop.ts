import { Theme, useMediaQuery } from '@mui/material';

function useIsDesktop() {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return { isDesktop };
}

export default useIsDesktop;
