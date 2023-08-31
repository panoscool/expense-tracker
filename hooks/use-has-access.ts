import { useCallback } from 'react';
import { useAppContext } from '../context/app-context';

function useHasAccess() {
  const { user } = useAppContext();

  const hasAccess = useCallback(
    (userId: string, creatorId?: string) => user?._id === userId || user?._id === creatorId,
    [user?._id],
  );

  const isCreator = useCallback((id: string) => user?._id === id, [user?._id]);

  return { hasAccess, isCreator };
}

export default useHasAccess;
