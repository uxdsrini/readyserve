import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types/order';
import OrderTracker from '../components/order/OrderTracker';
import OrderFeedback from '../components/order/OrderFeedback';
import OrderDetailsCard from '../components/order/OrderDetailsCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID is required');
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'orders', orderId),
      (doc) => {
        if (doc.exists()) {
          setOrder({ id: doc.id, ...doc.data() } as Order);
        } else {
          setError('Order not found');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  useEffect(() => {
    if (order?.status === 'delivered' && !order?.feedback) {
      const timer = setTimeout(() => {
        setShowFeedback(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [order?.status, order?.feedback]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !order) {
    return <ErrorMessage message={error || 'Order not found'} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <OrderDetailsCard order={order} />
        
        <div className="mt-8">
          <OrderTracker 
            status={order.status}
            estimatedDeliveryTime={`${order.deliveryDate} ${order.deliveryTime}`}
          />
        </div>

        {order.feedback && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Feedback</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Rating:</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (order.feedback?.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              {order.feedback?.comment && (
                <p className="text-gray-600">{order.feedback.comment}</p>
              )}
            </div>
          </div>
        )}

        {showFeedback && !order.feedback && (
          <OrderFeedback 
            orderId={order.id!} 
            onClose={() => setShowFeedback(false)} 
          />
        )}
      </div>
    </div>
  );
}