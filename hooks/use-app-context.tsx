import { useContext } from 'react';
import { AppContext } from '../context/app-context';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
