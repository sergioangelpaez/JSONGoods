import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAllProductCategories,
  getPaginatedProducts,
  getProductsByCategory,
  getProductBySearch,
} from '../services/productService';
import Fuse from 'fuse.js';
import { handleAsync } from '../utils/asyncHandler';
import { updatePagination } from '../utils/updatePagination';

const PRODUCTS_PER_PAGE = 20;

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [resultsFromCategorySearch, setResultsFromCategorySearch] = useState([]);
  const [query, setQuery] = useState('');

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  /** ========================
   *   LOADERS
   ======================== */
  const loadCategories = () =>
    handleAsync(
      async () => {
        const allCategories = await getAllProductCategories();
        setCategories(allCategories);
      },
      { setLoadingState: setLoadingCategories, setError }
    );

  const loadInitialProducts = () =>
    handleAsync(
      async () => {
        const initialProducts = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
        setProducts(initialProducts);
        setSkip(initialProducts.length);
        setHasMore(initialProducts.length === PRODUCTS_PER_PAGE);
      },
      { setLoadingState: setLoading, setError }
    );

  const loadMoreProducts = () =>
    handleAsync(
      async () => {
        if (activeCategories.length > 0 && hasMore) {
          const remaining = resultsFromCategorySearch.slice(skip);
          const moreProducts = remaining.slice(0, PRODUCTS_PER_PAGE);
          updatePagination(
            setProducts,
            setSkip,
            setHasMore,
            moreProducts,
            resultsFromCategorySearch.length
          );
        } else {
          const moreProducts = await getPaginatedProducts(skip, PRODUCTS_PER_PAGE);
          updatePagination(setProducts, setSkip, setHasMore, moreProducts);
        }
      },
      { setLoadingState: setLoadingMore, setError }
    );

  /** ========================
   *   SEARCH & FILTER
   ======================== */
  const searchProduct = query =>
    handleAsync(
      async () => {
        if (activeCategories.length > 0) {
          const fuse = new Fuse(resultsFromCategorySearch, {
            keys: ['nombre', 'description'],
            threshold: 0.3,
          });
          const results = fuse.search(query).map(r => r.item);
          setProducts(results.slice(0, PRODUCTS_PER_PAGE));
          setSkip(Math.min(PRODUCTS_PER_PAGE, results.length));
          setHasMore(results.length > PRODUCTS_PER_PAGE);
        } else {
          const results = await getProductBySearch(query);
          setProducts(results.slice(0, PRODUCTS_PER_PAGE));
          setSkip(Math.min(PRODUCTS_PER_PAGE, results.length));
          setHasMore(results.length > PRODUCTS_PER_PAGE);
        }
      },
      { setLoadingState: setLoading, setError }
    );

  const filterBySelectedCategories = () =>
    handleAsync(
      async () => {
        if (activeCategories.length > 0) {
          const results = await Promise.all(
            activeCategories.map(category => getProductsByCategory(category, 0, 0))
          );
          const flatResults = results.flat();
          setResultsFromCategorySearch(flatResults);
          setProducts(flatResults.slice(0, PRODUCTS_PER_PAGE));
          setSkip(Math.min(PRODUCTS_PER_PAGE, flatResults.length));
          setHasMore(flatResults.length > PRODUCTS_PER_PAGE);
        } else {
          const results = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
          setProducts(results);
          setSkip(results.length);
          setHasMore(results.length === PRODUCTS_PER_PAGE);
        }
      },
      { setLoadingState: setLoading, setError }
    );

  /** ========================
   *   EFFECTS
   ======================== */
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      filterBySelectedCategories();
    }, 400);
    return () => clearTimeout(id);
  }, [activeCategories]);

  useEffect(() => {
    if (query.trim() === '') {
      if (activeCategories.length === 0) loadInitialProducts();
      else setProducts(resultsFromCategorySearch);
    } else {
      searchProduct(query);
    }
  }, [query]);

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
        setQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => useContext(ProductContext);
