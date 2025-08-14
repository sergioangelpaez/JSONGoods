import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAllProductCategories,
  getPaginatedProducts,
  getProductsByCategory,
  getProductBySearch,
} from '../services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const PRODUCTS_PER_PAGE = 20;

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

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
        setProducts(initialProducts);
        setSkip(initialProducts.length);
        setHasMore(initialProducts.length === PRODUCTS_PER_PAGE);
      } catch (err) {
        setError('There was an error fetching the products');
      } finally {
        setLoading(false);
      }
    };
    loadInitialProducts();
  }, []);

  useEffect(() => {
    filterBySelectedCategories();
  }, [activeCategories]);

  const loadMoreProducts = async () => {
    if (!hasMore) return;

    try {
      setLoadingMore(true);

      let moreProducts;
      if (activeCategory) {
        moreProducts = await getProductsByCategory(activeCategory, skip, PRODUCTS_PER_PAGE);
      } else {
        moreProducts = await getPaginatedProducts(skip, PRODUCTS_PER_PAGE);
      }

      setProducts(prev => [...prev, ...moreProducts]);
      setSkip(prev => prev + moreProducts.length);
      setHasMore(moreProducts.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      setError('There was an error loading more products.');
    } finally {
      setLoadingMore(false);
    }
  };

  const searchProduct = async query => {
    try {
      setLoading(true);
      const results = await getProductBySearch(query);
      setProducts(results);
      setSkip(results.length);
      setHasMore(results.length === PRODUCTS_PER_PAGE);
      setError(null);
    } catch (err) {
      setError('There was an error searching for products.');
    } finally {
      setLoading(false);
    }
  };

  const filterBySelectedCategories = async () => {
    if (activeCategories.length > 0) {
      const results = await Promise.all(
        activeCategories.map(category => getProductsByCategory(category, 0, PRODUCTS_PER_PAGE))
      );
      setProducts(results.flat());
    } else {
      setProducts(await getPaginatedProducts(0, PRODUCTS_PER_PAGE));
      return;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        activeCategories,
        setActiveCategories,
        loadMoreProducts,
        loading,
        loadingMore,
        error,
        hasMore,
        searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
