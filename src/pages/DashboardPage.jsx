import React, { useEffect, useState } from 'react';
import KpiCard from '../components/KpiCard';
import CategoryChart from '../components/CategoryChart';
import ValueChart from '../components/ValueChart';
import { getProducts } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calcula KPIs
  const totalProdutos = products.length;
  const valorTotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStock = products.filter(p => p.quantity <= p.min_quantity).length;

  // Preparar dados para o gráfico de categorias
  const categoryData = Object.entries(
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.quantity;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Preparar dados para o gráfico de valores (top 4)
  const valueData = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4)
    .map(p => ({ name: p.name, value: p.quantity }));

  return (
    <div className="space-y-6 container mx-auto">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard title="Total de produtos" value={totalProdutos} />
            <KpiCard title="Valor total do estoque" value={`R$ ${valorTotal.toFixed(2)}`} />
            <KpiCard title="Produtos com estoque baixo" value={lowStock} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <CategoryChart data={categoryData} />
            <ValueChart data={valueData} />
          </div>
        </>
      )}
    </div>
  );
}
