import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import OrderCard from './OrderCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export default function OrdersList() {
  const { orders, loading } = useOrders();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">Start ordering delicious homemade food!</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}