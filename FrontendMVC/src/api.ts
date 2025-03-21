import axios from 'axios';
import { Customer, Order, Product } from './types';

const API_URL = 'http://localhost:8080/api'; // Adjust this to your API URL

export const api = {
  // Customers
  getAllCustomers: () => axios.get<Customer[]>(`${API_URL}/customers`).then(res => res.data),
  createCustomer: (customer: Customer) => axios.post<Customer>(`${API_URL}/customers`, customer).then(res => res.data),

  // Orders
  getAllOrders: () => axios.get<Order[]>(`${API_URL}/orders`).then(res => res.data),
  createOrder: (order: Order) => axios.post<Order>(`${API_URL}/orders`, order).then(res => res.data),

  // Products
  getAllProducts: () => axios.get<Product[]>(`${API_URL}/products`).then(res => res.data),
  createProduct: (product: Product) => axios.post<Product>(`${API_URL}/products`, product).then(res => res.data),
};