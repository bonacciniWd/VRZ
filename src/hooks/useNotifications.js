import { useCallback, useEffect, useRef, useState } from 'react';
import supabase from '../supabase';
import { mapNotificationType, mapObjectFromDB, mapObjectToDB } from '../utils/enumMapping.js';

/*
Notifications schema (real from Supabase):

CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type enum NOT NULL,                 -- Uses enum type (PT: status_proposta, convite_proposta, etc.)
  payload jsonb,                      -- FLEXIBLE: Contains all notification data
  read_at timestamptz,                -- NULL = unread, timestamp = read
  created_at timestamptz DEFAULT now(),
  
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

KEY DIFFERENCES FROM OLD CODE:
- Uses 'payload' (jsonb) instead of separate fields (message, entity_type, entity_id, link)
- Uses 'read_at' (timestamp) instead of 'read' (boolean)
- Type enum in Portuguese in DB, English in code

Payload structure examples:
{
  "message": "Your proposal was approved",
  "entity_type": "proposal",
  "entity_id": "uuid-here",
  "link": "/proposals/uuid-here"
}
*/

export function useNotifications({ autoSubscribe = true } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const channelRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: qError } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (qError) setError(qError.message);
    
    // Map from DB format (PT → EN)
    const mappedData = (data || []).map(notif => ({
      ...mapObjectFromDB(notif, { type: mapNotificationType }),
      read: !!notif.read_at, // Add computed 'read' field for easier use
    }));
    
    setNotifications(mappedData);
    setLoading(false);
  }, []);

  const markAsRead = useCallback(async (id) => {
    const now = new Date().toISOString();
    const { data, error: uError } = await supabase
      .from('notifications')
      .update({ read_at: now })
      .eq('id', id)
      .select()
      .single();
    if (uError) throw uError;
    
    // Map from DB and add computed 'read' field
    const mappedNotif = {
      ...mapObjectFromDB(data, { type: mapNotificationType }),
      read: !!data.read_at,
    };
    
    setNotifications(prev => prev.map(n => (n.id === id ? mappedNotif : n)));
    return mappedNotif;
  }, []);

  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (!unreadIds.length) return [];
    
    const now = new Date().toISOString();
    const { data, error: uError } = await supabase
      .from('notifications')
      .update({ read_at: now })
      .in('id', unreadIds)
      .select();
    if (uError) throw uError;
    
    // Map all updated notifications
    const mappedData = data.map(notif => ({
      ...mapObjectFromDB(notif, { type: mapNotificationType }),
      read: !!notif.read_at,
    }));
    
    const map = new Map(mappedData.map(d => [d.id, d]));
    setNotifications(prev => prev.map(n => map.get(n.id) || n));
    return mappedData;
  }, [notifications]);

  const createNotification = useCallback(async ({ type, payload }) => {
    // Map type to DB format (EN → PT)
    const dbNotif = {
      type: mapNotificationType.toDB(type),
      payload,
    };
    
    const { data, error: cError } = await supabase
      .from('notifications')
      .insert(dbNotif)
      .select()
      .single();
    if (cError) throw cError;
    
    // Map back to code format
    const mappedNotif = {
      ...mapObjectFromDB(data, { type: mapNotificationType }),
      read: !!data.read_at,
    };
    
    setNotifications(prev => [mappedNotif, ...prev]);
    return mappedNotif;
  }, []);

  useEffect(() => {
    if (!autoSubscribe) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    const channel = supabase.channel('notifications-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, payload => {
        // Map realtime payloads from DB format (PT → EN)
        if (payload.eventType === 'INSERT') {
          const mappedNotif = {
            ...mapObjectFromDB(payload.new, { type: mapNotificationType }),
            read: !!payload.new.read_at,
          };
          setNotifications(prev => [mappedNotif, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          const mappedNotif = {
            ...mapObjectFromDB(payload.new, { type: mapNotificationType }),
            read: !!payload.new.read_at,
          };
          setNotifications(prev => prev.map(n => (n.id === mappedNotif.id ? mappedNotif : n)));
        } else if (payload.eventType === 'DELETE') {
          setNotifications(prev => prev.filter(n => n.id !== payload.old.id));
        }
      })
      .subscribe();
    channelRef.current = channel;
    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [autoSubscribe]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    createNotification,
  };
}

export default useNotifications;
