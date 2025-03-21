import React, { useEffect, useState } from 'react';
import { Customer, Order, Product } from './types';
import { CustomerForm } from './components/CustomerForm';
import { ProductForm } from './components/ProductForm';
import { OrderForm } from './components/OrderForm';
import { api } from './api';
import { Users, Package, ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'customers' | 'products' | 'orders'>('customers');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersData, productsData, ordersData] = await Promise.all([
        api.getAllCustomers(),
        api.getAllProducts(),
        api.getAllOrders(),
      ]);
      setCustomers(customersData);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      toast.error('Error loading data');
    }
  };

  const handleCreateCustomer = async (customer: Customer) => {
    try {
      const newCustomer = await api.createCustomer(customer);
      setCustomers([...customers, newCustomer]);
      toast.success('Customer created successfully');
    } catch (error) {
      toast.error('Error creating customer');
    }
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      const newProduct = await api.createProduct(product);
      setProducts([...products, newProduct]);
      toast.success('Product created successfully');
    } catch (error) {
      toast.error('Error creating product');
    }
  };

  const handleCreateOrder = async (order: Order) => {
    try {
      const newOrder = await api.createOrder(order);
      setOrders([...orders, newOrder]);
      toast.success('Order created successfully');
    } catch (error) {
      toast.error('Error creating order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'products'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === 'customers' && 'Add New Customer'}
              {activeTab === 'products' && 'Add New Product'}
              {activeTab === 'orders' && 'Create New Order'}
            </h2>
            {activeTab === 'customers' && <CustomerForm onSubmit={handleCreateCustomer} />}
            {activeTab === 'products' && <ProductForm onSubmit={handleCreateProduct} />}
            {activeTab === 'orders' && (
              <OrderForm
                customers={customers}
                products={products}
                onSubmit={handleCreateOrder}
              />
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === 'customers' && 'Customer List'}
              {activeTab === 'products' && 'Product List'}
              {activeTab === 'orders' && 'Order List'}
            </h2>
            <div className="space-y-4">
              {activeTab === 'customers' && customers.map((customer) => (
                <div key={customer.id} className="p-4 border rounded-md">
                  <h3 className="font-medium">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>
              ))}
              {activeTab === 'products' && products.map((product) => (
                <div key={product.id} className="p-4 border rounded-md">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm font-medium">${product.price}</p>
                </div>
              ))}
              {activeTab === 'orders' && orders.map((order) => (
                <div key={order.id} className="p-4 border rounded-md">
                  <h3 className="font-medium">
                    Order #{order.id} - {order.status}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Customer: {customers.find(c => c.id === order.customerId)?.name}
                  </p>
                  <p className="text-sm font-medium">Total: ${order.totalAmount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;