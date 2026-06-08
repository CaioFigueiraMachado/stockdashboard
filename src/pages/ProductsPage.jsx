import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Produtos</h2>
      <ProductForm />
      <ProductList />
    </div>
  );
}
