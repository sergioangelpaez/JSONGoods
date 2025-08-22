import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAllProductCategories,
  getPaginatedProducts,
  getProductsByCategory,
  getProductBySearch,
} from '../services/productService';
import { shuffleArray } from '../utils/arrayUtils';
import debounce from 'lodash.debounce';
import { filter } from 'framer-motion/client';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [resultsFromCategorySearch, setResultsFromCategorySearch] = useState([]);

  const debouncedFilter = debounce(() => {
    filterBySelectedCategories();
  }, 1000);

  const PRODUCTS_PER_PAGE = 20;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const allCategories = await getAllProductCategories();
        setCategories(allCategories);
      } catch (err) {
        setError('There was an error fetching product categories.');
      } finally {
        setLoadingCategories(false);
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
    debouncedFilter();
  }, [activeCategories]);

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      let moreProducts = [];
      if (activeCategories.length > 0) {
        if (hasMore) {
          if (resultsFromCategorySearch.slice(skip).length < PRODUCTS_PER_PAGE) {
            moreProducts = resultsFromCategorySearch.slice(skip);
          } else {
            moreProducts = resultsFromCategorySearch.slice(skip, skip + PRODUCTS_PER_PAGE);
          }

          setProducts(prev => [...prev, ...moreProducts]);
          setSkip(prev => prev + moreProducts.length);
          setHasMore(products.length < resultsFromCategorySearch.length);
        }
      } else {
        moreProducts = await getPaginatedProducts(skip, PRODUCTS_PER_PAGE);
        setProducts(prev => [...prev, ...moreProducts]);
        setSkip(prev => prev + moreProducts.length);
        setHasMore(moreProducts.length === PRODUCTS_PER_PAGE);
      }
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
    try {
      if (activeCategories.length > 0) {
        setLoading(true);
        const results = await Promise.all(
          activeCategories.map(category => getProductsByCategory(category, 0, 0))
        );
        setResultsFromCategorySearch(results.flat());
        setSkip(
          results.flat().length >= PRODUCTS_PER_PAGE ? PRODUCTS_PER_PAGE : results.flat.length
        );
        setHasMore(results.flat().length > PRODUCTS_PER_PAGE);
      } else {
        setLoading(true);
        const results = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
        setProducts(results);
      }
    } catch (err) {
      setError('There was an error applying the category filters.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts(resultsFromCategorySearch.slice(0, PRODUCTS_PER_PAGE));
  }, [resultsFromCategorySearch]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        activeCategories,
        loadingCategories,
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
