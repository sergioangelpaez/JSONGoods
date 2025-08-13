import axios from './axiosInstance';

export const getPaginatedProducts = async (skip = 0, limit = 0) => {
  const response = await axios.get(`/products?skip=${skip}&limit=${limit}`);
  return response.data.products;
};

export const getProductsByCategory = async (category, skip = 0, limit = 0) => {
  const response = await axios.get(`/products/category/${category}?skip=${skip}&limit=${limit}`);
  console.log(response.data.products);
  return response.data.products;
};

export const getAllProductCategories = async () => {
  const response = await axios.get(`/products/category-list`);
  return response.data;
};

export const getProductBySearch = async (query) => {
  const response = await axios.get(`/products/search?q=${query}`);
  return response.data.products;
};