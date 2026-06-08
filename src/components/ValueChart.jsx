import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Recebe dados via props; se não houver, exibe placeholder.
export default function ValueChart({ data = [] }) {
  const chartData = data.length ? data : [
    { name: 'Sem dados', value: 1 },
  ];

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4 card">
      <h2 className="text-lg font-semibold mb-2">Valor em estoque (top 4)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#6366F1" name="Valor" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
