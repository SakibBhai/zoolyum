
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface UseRealtimeSubscriptionProps {
  table: string;
  events?: RealtimeEvent[];
  schema?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  onAll?: (payload: any) => void;
}

export const useRealtimeSubscription = ({
  table,
  events = ['*'],
  schema = 'public',
  onInsert,
  onUpdate,
  onDelete,
  onAll,
}: UseRealtimeSubscriptionProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      try {
        channel = supabase.channel('schema-db-changes');

        // Add listeners for each specified event
        events.forEach((event) => {
          if (event === '*' || event === 'INSERT') {
            channel.on(
              'postgres_changes',
              { event: 'INSERT', schema, table },
              (payload) => {
                console.log('INSERT event received:', payload);
                onInsert?.(payload);
                onAll?.(payload);
              }
            );
          }

          if (event === '*' || event === 'UPDATE') {
            channel.on(
              'postgres_changes',
              { event: 'UPDATE', schema, table },
              (payload) => {
                console.log('UPDATE event received:', payload);
                onUpdate?.(payload);
                onAll?.(payload);
              }
            );
          }

          if (event === '*' || event === 'DELETE') {
            channel.on(
              'postgres_changes',
              { event: 'DELETE', schema, table },
              (payload) => {
                console.log('DELETE event received:', payload);
                onDelete?.(payload);
                onAll?.(payload);
              }
            );
          }
        });

        channel
          .subscribe((status) => {
            console.log(`Realtime subscription status for ${table}:`, status);
            setIsConnected(status === 'SUBSCRIBED');
            if (status === 'CHANNEL_ERROR') {
              setError(new Error(`Failed to subscribe to realtime changes for ${table}`));
            }
          });
      } catch (err) {
        console.error(`Error setting up realtime subscription for ${table}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    setupSubscription();

    return () => {
      // Cleanup subscription when component unmounts
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, schema, events.join(',')]);

  return { isConnected, error };
};
