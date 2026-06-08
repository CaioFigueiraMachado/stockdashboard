// src/lib/api/products.js
import { supabase } from './supabaseClient';

// ------------------------------------------------------------
// Helper to transform Supabase rows into plain objects
// ------------------------------------------------------------
const mapProduct = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  quantity: Number(row.quantity),
  price: Number(row.price),
  minQuantity: Number(row.min_quantity),
});

export const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data.map(mapProduct);
};

export const createProduct = async (product) => {
  const { data, error } = await supabase.from('products').insert([
    {
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      min_quantity: product.minQuantity,
    },
  ]).single();
  if (error) throw error;
  return mapProduct(data);
};

export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: updates.name,
      category: updates.category,
      quantity: updates.quantity,
      price: updates.price,
      min_quantity: updates.minQuantity,
    })
    .eq('id', id)
    .single();
  if (error) throw error;
  return mapProduct(data);
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
};
