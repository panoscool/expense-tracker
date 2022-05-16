import { useContext } from 'react';
import { AppContext } from '../context/app-context';

function useAppState() {
  return useContext(AppContext);
}

export default useAppState;
