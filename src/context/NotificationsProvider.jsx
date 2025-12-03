import { createContext, useContext } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const notif = useNotifications({ autoSubscribe: true });
  return (
    <NotificationsContext.Provider value={notif}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotificationsContext must be used within NotificationsProvider');
  return ctx;
}

export default NotificationsProvider;
