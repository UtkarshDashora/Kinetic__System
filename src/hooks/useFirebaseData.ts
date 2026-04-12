import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../firebase';

/**
 * Custom hook to subscribe to a specific path in Firebase Realtime Database.
 * @param path The database path to subscribe to (e.g., 'alerts', 'schedule').
 * @param initialData The default data to return before the first sync.
 */
export function useFirebaseData<T>(path: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dataRef = ref(db, path);
    
    // Subscribe to real-time updates
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) {
        setData(val);
      }
      setLoading(false);
    }, (err) => {
      console.error(`Firebase subscription error for path "${path}":`, err);
      setError(err);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
}
