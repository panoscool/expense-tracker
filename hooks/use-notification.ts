import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useAppContext from '../hooks/use-app-context';
import { removeNotification } from '../lib/services/helpers';

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar();
  const [displayed, setDisplayed] = useState<number[]>([]);
  const { notifications, dispatch } = useAppContext();

  useEffect(() => {
    let timer: any;

    for (const notification of notifications) {
      timer = setTimeout(() => {
        // If notification already displayed, abort
        if (displayed.indexOf(notification.options.key) >= 0) return;

        // Display notification using notistack
        enqueueSnackbar(notification.message, notification.options);

        // Add notification's key to the local state
        setDisplayed([...displayed, notification.options.key]);

        // Dispatch action to remove the notification from the global state
        removeNotification(dispatch, notification.options.key);
      }, 5);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, displayed, enqueueSnackbar, notifications]);
}
