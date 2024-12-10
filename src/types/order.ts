export interface OrderRecipe {
  id: string;
  name: string;
  price: number;
  homemakerId: string;
  homemakerName: string;
  photos?: string[];
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  landmark?: string;
  city: string;
  pincode: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Order {
  id?: string;
  userId: string;
  recipe: OrderRecipe;
  quantity: number;
  totalAmount: number;
  deliveryDate: string;
  deliveryTime: string;
  address: OrderAddress;
  specialInstructions?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}