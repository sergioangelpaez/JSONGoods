import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

// --- Mocks ---
vi.mock('../context/ProductContext', () => ({
  useProducts: vi.fn(),
}));

vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../components/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('../components/ProductCard', () => ({
  default: ({ product }) => <div data-testid="product-card">{product.name}</div>,
}));

vi.mock('../components/CartSidebar', () => ({
  default: ({ children }) => <aside data-testid="cart-sidebar">{children}</aside>,
}));

vi.mock('../components/Toast', () => ({
  default: ({ message, title }) => (
    <div role="alert">
      <p>{title}</p>
      <p>{message}</p>
    </div>
  ),
}));

vi.mock('../components/Skeletons/ProductCardSekeleton', () => ({
  default: () => <div data-testid="product-skeleton">Skeleton</div>,
}));
vi.mock('../components/Skeletons/FilterSidebarSkeleton', () => ({
  default: () => <div data-testid="filter-skeleton">Filter Skeleton</div>,
}));
vi.mock('../components/FilterSidebar', () => ({
  default: props => (
    <div data-testid={props['data-testid'] || 'filter-sidebar'}>Filter Sidebar</div>
  ),
}));

describe('App integration', () => {
  const mockSetErrors = vi.fn();
  const mockLoadMoreProducts = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    useProducts.mockReturnValue({
      products: [{ id: 1, name: 'Product A' }],
      categories: ['cat1', 'cat2'],
      activeCategories: [],
      loadingCategories: false,
      setActiveCategories: vi.fn(),
      loadMoreProducts: mockLoadMoreProducts,
      loading: false,
      loadingMore: false,
      hasMore: true,
      errors: {},
      setErrors: mockSetErrors,
      resultsFromCategorySearch: [],
    });

    useCart.mockReturnValue({
      isCartOpen: false,
      setIsCartOpen: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders header, product and cart sidebar', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('product-card')).toHaveTextContent('Product A');
    expect(screen.getByTestId('cart-sidebar')).toBeInTheDocument();
  });

  it('shows skeletons when loading', () => {
    useProducts.mockReturnValueOnce({
      ...useProducts(),
      loading: true,
    });
    render(<App />);
    expect(screen.getAllByTestId('product-skeleton').length).toBeGreaterThan(0);
  });

  it('renders error toast when errors exist', () => {
    useProducts.mockReturnValueOnce({
      ...useProducts(),
      errors: {
        network: { title: 'Error', message: 'Network error', variant: 'error' },
      },
    });

    render(<App />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
  });

  it('calls loadMoreProducts when clicking "Load more"', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /load more products/i });
    fireEvent.click(btn);
    expect(mockLoadMoreProducts).toHaveBeenCalled();
  });

  it('toggles filter sidebar in mobile', () => {
    render(<App />);
    const filterBtn = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterBtn);

    const sidebars = screen.getAllByTestId('filter-sidebar');
    expect(sidebars.length).toBeGreaterThan(1);

    expect(sidebars[1]).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    act(() => {
      vi.advanceTimersByTime(500);
    });
  });
});
