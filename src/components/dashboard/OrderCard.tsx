import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ChefHat } from 'lucide-react';
import { Order } from '../../types';
import { OrderStatus } from './OrderStatus';
import { formatDate, formatPrice } from '../../utils/formatters';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  if (!order) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.id?.slice(-6)}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <OrderStatus status={order.status} />
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
            {order.recipe?.photos?.[0] ? (
              <img
                src={order.recipe.photos[0]}
                alt={order.recipe?.name || 'Recipe'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{order.recipe?.name}</h4>
            {order.recipe?.homemakerName && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <ChefHat className="w-4 h-4 mr-1" />
                <span>{order.recipe.homemakerName}</span>
              </div>
            )}
            {order.deliveryDate && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                <span>Delivery on {order.deliveryDate}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(order.totalAmount)}
            </p>
            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 mt-2"
            >
              Track Order
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}