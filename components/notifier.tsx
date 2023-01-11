import { useSnackbar } from 'notistack';
import { useState } from 'react';
import useAppContext from '../hooks/use-app-context';
import { NotificationsType } from '../lib/interfaces/common';
import { removeNotification } from '../lib/services/helpers';

function Notifier() {
  const { enqueueSnackbar } = useSnackbar();
  const [displayed, setDisplayed] = useState<number[]>([]);
  const { notifications, dispatch } = useAppContext();

  function storeDisplayed(key: number) {
    setDisplayed([...displayed, key]);
  }

  notifications.forEach((notification: NotificationsType) => {
    setTimeout(() => {
      // If notification already displayed, abort
      if (displayed.indexOf(notification.options.key) >= 0) return;

      // Display notification using notistack
      enqueueSnackbar(notification.message, notification.options);

      // Add notification's key to the local state
      storeDisplayed(notification.options.key);

      // Dispatch action to remove the notification from the redux store
      removeNotification(dispatch, notification.options.key);
    }, 1);
  });

  return null;
}

export default Notifier;
