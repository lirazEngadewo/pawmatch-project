import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';

function useUserPreferences(currentUser) {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const query = currentUser
      ? supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null });

    query.then(({ data, error }) => {
      if (error) {
        console.error('useUserPreferences: failed to load preferences', error);
      }
      console.log('useUserPreferences: loaded preferences for', currentUser?.id, data);
      setPreferences(data ?? null);
    });
  }, [currentUser]);

  return preferences;
}

export default useUserPreferences;
