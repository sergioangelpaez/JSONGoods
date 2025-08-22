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
import { mapError } from '../utils/errorMapper';
import { useCart } from './CartContext';

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
  const [errors, setErrors] = useState({
    categories: null,
    products: null,
    search: null,
  });

  const { clearCart } = useCart();

  /** ========================
   *   LOADERS
   ======================== */
  const loadCategories = () =>
    handleAsync(
      async () => {
        const allCategories = await getAllProductCategories();
        setCategories(allCategories);
      },
      {
        setLoadingState: setLoadingCategories,
        setError: err => setErrors(prev => ({ ...prev, categories: mapError(err, 'categories') })),
      }
    );

  const loadInitialProducts = () =>
    handleAsync(
      async () => {
        const initialProducts = await getPaginatedProducts(0, PRODUCTS_PER_PAGE);
        setProducts(initialProducts);
        setSkip(initialProducts.length);
        setHasMore(initialProducts.length === PRODUCTS_PER_PAGE);
      },
      {
        setLoadingState: setLoading,
        setError: err => setErrors(prev => ({ ...prev, products: mapError(err, 'products') })),
      }
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
      {
        setLoadingState: setLoadingMore,
        setError: err => setErrors(prev => ({ ...prev, products: mapError(err, 'products') })),
      }
    );

  const reloadApp = () => {
    setSkip(0);
    setActiveCategories([]);
    setResultsFromCategorySearch([]);
    setQuery('');
    clearCart();
    loadInitialProducts();
  };

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
      {
        setLoadingState: setLoading,
        setError: err => setErrors(prev => ({ ...prev, search: mapError(err, 'search') })),
      }
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
      {
        setLoadingState: setLoading,
        setError: err => setErrors(prev => ({ ...prev, search: mapError(err, 'search') })),
      }
    );

  /** ========================
   *   EFFECTS
   ======================== */

  //load product categories on app start
  useEffect(() => {
    loadCategories();
  }, []);

  //refilter products on category change
  useEffect(() => {
    const id = setTimeout(() => {
      filterBySelectedCategories();
    }, 400);
    return () => clearTimeout(id);
  }, [activeCategories]);

  // Update products when the search query changes:
  // - If query is empty → show initial or category-filtered products
  // - If query has text → run product search
  useEffect(() => {
    if (query.trim() === '') {
      if (activeCategories.length === 0) loadInitialProducts();
      else setProducts(resultsFromCategorySearch);
    } else {
      searchProduct(query);
    }
  }, [query]);

  // Reset products whenever category search results change,
  // showing only the first page of results
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
        errors,
        hasMore,
        searchProduct,
        setQuery,
        setErrors,
        resultsFromCategorySearch,
        reloadApp,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => useContext(ProductContext);
