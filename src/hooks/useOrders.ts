import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrdersQuery, getHomemakerOrdersQuery } from '../lib/firebase';
import { Order } from '../types';
import { handleFirebaseError } from '../lib/errorHandling';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const query = getUserOrdersQuery(currentUser.uid);
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        const errorMessage = handleFirebaseError(error);
        setError(errorMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  return { orders, loading, error };
}

export function useHomemakerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const query = getHomemakerOrdersQuery(currentUser.uid);
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        const errorMessage = handleFirebaseError(error);
        setError(errorMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  return { orders, loading, error };
}