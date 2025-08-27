import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { ProductProvider, useProducts } from '../../context/ProductContext';
import * as productService from '../../services/productService';
import {
  getAllProductCategories,
  getPaginatedProducts,
  getProductsByCategory,
  getProductBySearch,
} from '../../services/productService';
import { mapError } from '../../utils/errorMapper';

// --------------------
// MOCKS
// --------------------

// Mock product services with real promise
vi.mock('../../services/productService', () => ({
  getAllProductCategories: vi.fn(),
  getPaginatedProducts: vi.fn(),
  getProductsByCategory: vi.fn(),
  getProductBySearch: vi.fn(),
}));

// Mock errorMapper
vi.mock('../../utils/errorMapper', () => ({
  mapError: vi.fn(),
}));

// Mock Fuse.js
vi.mock('fuse.js', () => ({
  default: vi.fn().mockImplementation(() => ({
    search: vi.fn(() => []),
  })),
}));

// Mock asyncHandler with real promise
vi.mock('../../utils/asyncHandler', () => ({
  handleAsync: (fn, { setLoadingState, setError }) => {
    return new Promise(async resolve => {
      setLoadingState(true);
      setError(null);
      try {
        await fn();
      } catch (err) {
        setError(err);
      } finally {
        setLoadingState(false);
        resolve();
      }
    });
  },
}));

// Mock updatePagination
vi.mock('../../utils/updatePagination', () => ({
  updatePagination: (setProducts, setSkip, setHasMore, newItems, totalAvailable = null) => {
    setProducts(prev => {
      const updated = [...prev, ...newItems];
      setSkip(updated.length);
      if (totalAvailable !== null) {
        setHasMore(updated.length < totalAvailable);
      } else {
        setHasMore(newItems.length === 20);
      }
      return updated;
    });
  },
}));

// Mock CartContext
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({ clearCart: vi.fn() }),
}));

// Fake timers
vi.useFakeTimers();

// Datos de prueba
const mockCategories = ['cat1', 'cat2'];
const mockProducts = Array.from({ length: 20 }, (_, i) => ({ id: i, nombre: `Product ${i}` }));

// --------------------
// TEST COMPONENT
// --------------------
function TestComponent() {
  const ctx = useProducts();
  return (
    <div>
      <span data-testid="products">{ctx.products.length}</span>
      <span data-testid="categories">{ctx.categories.length}</span>
      <span data-testid="loading">{ctx.loading ? 'yes' : 'no'}</span>
      <span data-testid="loadingCategories">{ctx.loadingCategories ? 'yes' : 'no'}</span>
      <span data-testid="hasMore">{ctx.hasMore ? 'yes' : 'no'}</span>
    </div>
  );
}

// --------------------
// TESTS
// --------------------
describe('ProductContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(productService, 'getAllProductCategories').mockResolvedValue(mockCategories);
    vi.spyOn(productService, 'getPaginatedProducts').mockResolvedValue(mockProducts);
    vi.spyOn(productService, 'getProductsByCategory').mockResolvedValue(mockProducts);
    vi.spyOn(productService, 'getProductBySearch').mockResolvedValue(mockProducts);

    mapError.mockImplementation((_, type) => `${type}-error`);
  });

  it('loads initial categories and products', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      ));
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(getByTestId('categories').textContent).toBe('2');
    expect(getByTestId('products').textContent).toBe('20');
    expect(getByTestId('loading').textContent).toBe('no');
    expect(getByTestId('loadingCategories').textContent).toBe('no');
    expect(getByTestId('hasMore').textContent).toBe('yes');
  });

  it('filters products by active categories', async () => {
    let ctx;
    function SetCategory() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <SetCategory />
        </ProductProvider>
      );
    });

    await act(async () => {
      ctx.setActiveCategories(['cat1']);
      await vi.advanceTimersByTimeAsync(400);
      await Promise.resolve();
    });

    expect(productService.getProductsByCategory);
  });

  it('searches products', async () => {
    let ctx;
    function SearchComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <SearchComponent />
        </ProductProvider>
      );
    });

    await act(async () => {
      await ctx.searchProduct('test');
    });

    expect(getProductBySearch).toHaveBeenCalledWith('test');
  });

  it('reloadApp resets state and loads products', async () => {
    let ctx;
    function ReloadComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <ReloadComponent />
        </ProductProvider>
      );
    });

    await act(async () => {
      ctx.setActiveCategories(['cat1']);
      ctx.setQuery('test');
      ctx.reloadApp();
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(ctx.activeCategories).toEqual([]);
    expect(ctx.query).toBe('');
    expect(getPaginatedProducts).toHaveBeenCalled();
  });

  it('handles category load errors', async () => {
    getAllProductCategories.mockRejectedValue(new Error('fail'));
    let ctx;
    function ErrorComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <ErrorComponent />
        </ProductProvider>
      );
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(mapError).toHaveBeenCalledWith(expect.any(Error), 'categories');
    expect(ctx.errors.categories).toBe('categories-error');
  });

  it('handles product load errors', async () => {
    getPaginatedProducts.mockRejectedValue(new Error('fail'));
    let ctx;
    function ErrorComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <ErrorComponent />
        </ProductProvider>
      );
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(ctx.errors.products).toBe('products-error');
  });

  it('handles search errors', async () => {
    getProductBySearch.mockRejectedValue(new Error('fail'));
    let ctx;
    function ErrorComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <ErrorComponent />
        </ProductProvider>
      );
    });

    await act(async () => {
      await ctx.searchProduct('fail');
    });

    expect(ctx.errors.search).toBe('search-error');
  });

  it('loads more products correctly', async () => {
    let ctx;
    function LoadMoreComponent() {
      ctx = useProducts();
      return null;
    }

    await act(async () => {
      render(
        <ProductProvider>
          <LoadMoreComponent />
        </ProductProvider>
      );
    });

    await act(async () => {
      await ctx.loadMoreProducts();
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(ctx.products.length).toBeGreaterThan(0);
  });
});
