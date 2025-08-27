import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, act } from '@testing-library/react';
import { ProductProvider, useProducts } from '../../context/ProductContext';

// Mock dependencies
vi.mock('../../services/productService', () => ({
  getAllProductCategories: vi.fn(),
  getPaginatedProducts: vi.fn(),
  getProductsByCategory: vi.fn(),
  getProductBySearch: vi.fn(),
}));
vi.mock('fuse.js', () => ({
  default: vi.fn().mockImplementation(() => ({
    search: vi.fn(() => []),
  })),
}));
vi.mock('../../utils/asyncHandler', () => ({
  handleAsync: async (fn, opts) => {
    if (opts?.setLoadingState) opts.setLoadingState(true);
    try {
      await fn();
    } finally {
      if (opts?.setLoadingState) opts.setLoadingState(false);
    }
  },
}));
vi.mock('../../utils/updatePagination', () => ({
  updatePagination: vi.fn(),
}));
vi.mock('../../utils/errorMapper', () => ({
  mapError: vi.fn((err, type) => `${type}-error`),
}));
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({ clearCart: vi.fn() }),
}));

const mockCategories = ['cat1', 'cat2'];
const mockProducts = Array.from({ length: 20 }, (_, i) => ({ id: i, nombre: `Product ${i}` }));

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

describe('ProductContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    require('../../services/productService').getAllProductCategories.mockResolvedValue(
      mockCategories
    );
    require('../../services/productService').getPaginatedProducts.mockResolvedValue(mockProducts);
    require('../../services/productService').getProductsByCategory.mockResolvedValue(mockProducts);
    require('../../services/productService').getProductBySearch.mockResolvedValue(mockProducts);
  });

  it('provides initial categories and products', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <ProductProvider>
          <TestComponent />
        </ProductProvider>
      ));
    });
    expect(getByTestId('categories').textContent).toBe('2');
    expect(getByTestId('products').textContent).toBe('20');
    expect(getByTestId('loading').textContent).toBe('no');
    expect(getByTestId('loadingCategories').textContent).toBe('no');
    expect(getByTestId('hasMore').textContent).toBe('no');
  });

  it('can set active categories and filter products', async () => {
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
    });
    expect(require('../../services/productService').getProductsByCategory).toHaveBeenCalled();
  });

  it('can search products', async () => {
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
    expect(require('../../services/productService').getProductBySearch).toHaveBeenCalledWith(
      'test'
    );
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
    });
    expect(ctx.activeCategories).toEqual([]);
    expect(ctx.query).toBe('');
    expect(require('../../services/productService').getPaginatedProducts).toHaveBeenCalled();
  });

  it('handles errors in categories', async () => {
    require('../../services/productService').getAllProductCategories.mockRejectedValue(
      new Error('fail')
    );
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
    expect(ctx.errors.categories).toBe('categories-error');
  });

  it('handles errors in products', async () => {
    require('../../services/productService').getPaginatedProducts.mockRejectedValue(
      new Error('fail')
    );
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
    expect(ctx.errors.products).toBe('products-error');
  });

  it('handles errors in search', async () => {
    require('../../services/productService').getProductBySearch.mockRejectedValue(
      new Error('fail')
    );
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
});

// We recommend installing an extension to run vitest tests.
