import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <nav className="bg-primary-600 text-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">📦 Stock Dashboard</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Produtos</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
          </ul>
        </nav>
        <main className="container mx-auto p-6">
        <h2 className="text-center text-xl font-bold mb-4">Demo da Página</h2>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
