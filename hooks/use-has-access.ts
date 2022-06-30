import { useCallback, useMemo } from 'react';
import useAppContext from './use-app-context';

function useHasAccess() {
  const { user } = useAppContext();

  const hasAccess = useCallback(
    (userId: string, creatorId?: string) => {
      return user?._id === userId || user?._id === creatorId;
    },
    [user?._id],
  );

  const isCreator = useCallback((id: string) => user?._id === id, [user?._id]);

  return { hasAccess, isCreator };
}

export default useHasAccess;
