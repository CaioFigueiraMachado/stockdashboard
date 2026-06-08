// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../lib/api";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const handler = () => fetchProducts();
    window.addEventListener("productAdded", handler);
    return () => window.removeEventListener("productAdded", handler);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir este produto?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-primary-100 dark:bg-primary-900">
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Nome</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Categoria</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Qtd</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Preço</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.name}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.category}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.quantity}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">R$ {p.price}</td>
              <td className="px-4 py-2 space-x-2 text-right">
                {/* Edit functionality can be added later */}
                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-primary-100 dark:bg-primary-900">
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Nome</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Categoria</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Qtd</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Preço</th>
            <th className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.name}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.category}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.quantity}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">R$ {p.price}</td>
              <td className="px-4 py-2 space-x-2 text-right">
                {/* Edit functionality can be added later */}
                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
