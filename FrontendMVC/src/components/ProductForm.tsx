import React, { useState } from 'react';
import { Product } from '../types';
import { Package } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ name: '', description: '', price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Package className="w-4 h-4 mr-2" />
        Add Product
      </button>
    </form>
  );
}