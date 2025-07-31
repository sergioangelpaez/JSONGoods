import axios from './axiosInstance';

export const getPaginatedProducts = async (skip = 0, limit = 0) => {
  const response = await axios.get(`/products?skip=${skip}&limit=${limit}`);
  return response.data.products;
};

export const getProductsByCategory = async (category, skip = 0, limit = 0) => {
  const response = await axios.get(`/products/category/${category}?skip=${skip}&limit=${limit}`);
  return response.data.products;
};

export const getAllProductCategories = async () => {
  const response = await axios.get(`/products/category-list`);
  return response.data;
};
