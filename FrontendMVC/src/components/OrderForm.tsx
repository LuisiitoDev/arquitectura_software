import React, { useState } from 'react';
import { Order, Customer, Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface OrderFormProps {
  customers: Customer[];
  products: Product[];
  onSubmit: (order: Order) => void;
}

export function OrderForm({ customers, products, onSubmit }: OrderFormProps) {
  const [order, setOrder] = useState<Order>({
    customerId: 0,
    products: [],
    totalAmount: 0,
    status: 'pending',
    orderDate: new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(order);
    setOrder({
      customerId: 0,
      products: [],
      totalAmount: 0,
      status: 'pending',
      orderDate: new Date().toISOString(),
    });
  };

  const calculateTotal = (selectedProducts: number[]) => {
    return selectedProducts.reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return total + (product?.price || 0);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
          Customer
        </label>
        <select
          id="customer"
          value={order.customerId}
          onChange={(e) => setOrder({ ...order, customerId: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Products</label>
        <div className="mt-2 space-y-2">
          {products.map((product) => (
            <label key={product.id} className="flex items-center">
              <input
                type="checkbox"
                value={product.id}
                checked={order.products.includes(product.id!)}
                onChange={(e) => {
                  const newProducts = e.target.checked
                    ? [...order.products, product.id!]
                    : order.products.filter(id => id !== product.id);
                  setOrder({
                    ...order,
                    products: newProducts,
                    totalAmount: calculateTotal(newProducts),
                  });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{product.name} - ${product.price}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">
          Total Amount: ${order.totalAmount.toFixed(2)}
        </p>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Create Order
      </button>
    </form>
  );
}