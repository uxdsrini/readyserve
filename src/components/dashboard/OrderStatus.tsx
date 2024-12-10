import React from 'react';

interface OrderStatusProps {
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
}

export function OrderStatus({ status }: OrderStatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}