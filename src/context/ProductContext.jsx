import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAllProductCategories,
  getPaginatedProducts,
  getProductsByCategory,
} from '../services/productService';

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const PRODUCTS_PER_PAGE = 20;

  //set categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const allCategories = await getAllProductCategories();
        setCategories(allCategories);
      } catch (err) {
        setError('There was an error fetching product categories.');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  //load first 20 products on app first load
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
        setProducts(initialProducts);
        setSkip(PRODUCTS_PER_PAGE);
        setHasMore(initialProducts.length === PRODUCTS_PER_PAGE);
      } catch (err) {
        setError('There was an error fetching the products');
      } finally {
        setLoading(false);
      }
    };
    loadInitialProducts();
  }, []);

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      let moreProducts;
      if (activeCategory) {
        moreProducts = await getProductsByCategory(activeCategory, skip, PRODUCTS_PER_PAGE);
      } else {
        moreProducts = await getPaginatedProducts(skip, PRODUCTS_PER_PAGE);
      }

      setProducts(prev => [...prev, ...moreProducts]);
      setSkip(prev => prev + PRODUCTS_PER_PAGE);
      setHasMore(moreProducts.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      setError('There was an error loading more products.');
    } finally {
      setLoadingMore(false);
    }
  };

  const applyCategoryFilter = async category => {
    try {
      setLoading(true);
      setActiveCategory(category);
      setSkip(0);

      const filteredProducts = await getProductsByCategory(category, 0, PRODUCTS_PER_PAGE);
      setProducts(filteredProducts);
      setHasMore(filteredProducts.length === PRODUCTS_PER_PAGE);
      setError(null);
    } catch (err) {
      setError('There was an error applying the filter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loadMoreProducts,
        loading,
        loadingMore,
        error,
        hasMore,
        applyCategoryFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
