import React from 'react';
import { Package } from 'lucide-react';
import OrderCard from './OrderCard';
import { Order } from '../../types';

interface HomemakerOrdersListProps {
  orders: Order[];
  loading: boolean;
}

export default function HomemakerOrdersList({ orders, loading }: HomemakerOrdersListProps) {
  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500">Your orders will appear here once customers place them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}