export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id?: number;
  customerId: number;
  products: number[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderDate: string;
}