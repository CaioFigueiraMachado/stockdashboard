import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Recebe dados de categorias via props. Se não houver, exibe placeholder.
export default function CategoryChart({ data = [] }) {
  const COLORS = ['#6366F1', '#EF4444', '#10B981', '#F59E0B', '#A78BFA'];
  const chartData = data.length ? data : [
    { name: 'Sem dados', value: 1 },
  ];

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4 card">
      <h2 className="text-lg font-semibold mb-2">Distribuição por Categoria</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
