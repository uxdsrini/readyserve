import React from 'react';
import { Clock, MapPin, ChefHat } from 'lucide-react';
import { Order } from '../../types/order';
import { OrderStatus } from '../dashboard/OrderStatus';
import { formatDate, formatPrice } from '../../utils/formatters';

interface OrderDetailsCardProps {
  order: Order;
}

export default function OrderDetailsCard({ order }: OrderDetailsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order.id?.slice(-6)}
          </h1>
          <OrderStatus status={order.status} />
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            {order.recipe?.photos?.[0] ? (
              <img
                src={order.recipe.photos[0]}
                alt={order.recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {order.recipe.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <ChefHat className="w-4 h-4 mr-1" />
              <span>{order.recipe.homemakerName}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>Delivery on {order.deliveryDate} at {order.deliveryTime}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{order.address.street}, {order.address.city}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{order.address.fullName}</p>
            <p>{order.address.street}</p>
            {order.address.apartment && <p>{order.address.apartment}</p>}
            {order.address.landmark && <p>Landmark: {order.address.landmark}</p>}
            <p>{order.address.city} - {order.address.pincode}</p>
            <p>Phone: {order.address.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}