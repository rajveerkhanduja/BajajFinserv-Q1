import { useState, useEffect, useCallback } from 'react';
import { fetchDoctors } from '../services/api';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDoctors = useCallback(async () => {
    if (!navigator.onLine) {
      setError('You are currently offline. Please check your internet connection.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load doctors. Please try again later.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();

    const handleOnline = () => {
      setError(null);
      loadDoctors();
    };

    const handleOffline = () => {
      setError('You are currently offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadDoctors]);

  return { doctors, loading, error, refetch: loadDoctors };
};