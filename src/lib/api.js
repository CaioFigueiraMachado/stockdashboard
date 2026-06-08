// src/lib/api.js
import { supabase } from './supabaseClient.js';

// Table name in Supabase
const TABLE = 'products';

export async function getProducts() {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
}

export async function addProduct(product) {
  const { data, error } = await supabase.from(TABLE).insert([product]);
  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return data;
}
