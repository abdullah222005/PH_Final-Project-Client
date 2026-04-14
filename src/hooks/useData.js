import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';

// Hook for fetching dashboard statistics
export const useDashboardStats = (userEmail, role) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getDashboardStats(userEmail, role);
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  }, [userEmail, role]);

  useEffect(() => {
    if (userEmail && role) {
      fetchStats();
    }
  }, [userEmail, role, fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

// Hook for fetching parcels
export const useParcels = (email = null) => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParcels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getAllParcels(email);
      setParcels(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching parcels:', err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchParcels();
  }, [fetchParcels]);

  const updateParcelStatus = async (parcelId, newStatus) => {
    try {
      await ApiService.updateParcelStatus(parcelId, newStatus);
      await fetchParcels(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error updating parcel status:', err);
      return false;
    }
  };

  const deleteParcel = async (parcelId) => {
    try {
      await ApiService.deleteParcel(parcelId);
      await fetchParcels(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error deleting parcel:', err);
      return false;
    }
  };

  return { 
    parcels, 
    loading, 
    error, 
    refetch: fetchParcels,
    updateParcelStatus,
    deleteParcel
  };
};

// Hook for fetching riders
export const useRiders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRiders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getAllRiders();
      setRiders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching riders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRiders();
  }, [fetchRiders]);

  const updateRiderStatus = async (riderId, newStatus) => {
    try {
      await ApiService.updateRiderStatus(riderId, newStatus);
      await fetchRiders(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error updating rider status:', err);
      return false;
    }
  };

  return { 
    riders, 
    loading, 
    error, 
    refetch: fetchRiders,
    updateRiderStatus
  };
};

// Hook for fetching payment history
export const usePayments = (email = null) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getPaymentHistory(email);
      setPayments(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
};

// Hook for user authentication state
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('firebaseToken');
  }, []);

  const updateUserRole = useCallback((newRole) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, role: newRole };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  }, [currentUser]);

  return { currentUser, loading, login, logout, updateUserRole };
};
