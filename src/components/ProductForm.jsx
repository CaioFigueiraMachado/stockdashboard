// src/components/ProductForm.jsx
import React, { useState } from "react";
import { addProduct } from "../lib/api";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    min_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
      min_quantity: parseInt(formData.min_quantity, 10),
    };
    try {
      await addProduct(product);
      setFormData({ name: "", category: "", quantity: "", price: "", min_quantity: "" });
      const event = new Event("productAdded");
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Adicionar Produto</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <input name="name" placeholder="Nome" value={formData.name} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input name="category" placeholder="Categoria" value={formData.category} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input name="quantity" type="number" placeholder="Quantidade" value={formData.quantity} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input name="price" type="number" step="0.01" placeholder="Preço" value={formData.price} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input name="min_quantity" type="number" placeholder="Quantidade mínima" value={formData.min_quantity} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        <button type="submit" className="btn-primary w-full py-2 mt-2">Salvar</button>
      </form>
    </div>
  );
}
