import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { getStarTypes } from '../../utils/getStarTypes';

// Mock del hook de carrito
vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

// Mock de getStarTypes (para controlar las estrellas)
vi.mock('../../utils/getStarTypes', () => ({
  getStarTypes: vi.fn(),
}));

// Mock de componentes hijos
vi.mock('../../components/Button', () => ({
  default: ({ children, onClick, className }) => (
    <button data-testid="mock-button" className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('../../components/CategoryChip', () => ({
  default: ({ children }) => <span data-testid="mock-category">{children}</span>,
}));

vi.mock('../../components/StarIcon', () => ({
  default: ({ type }) => <span data-testid="mock-star">{type}</span>,
}));

describe('ProductCard component', () => {
  const mockAddToCart = vi.fn();

  const product = {
    title: 'Test Product',
    description: 'This is a test product',
    price: 99.99,
    rating: 4.2,
    reviews: [{}, {}, {}],
    tags: ['tech', 'new'],
    thumbnail: 'https://example.com/test.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useCart.mockReturnValue({ addToCart: mockAddToCart });
    getStarTypes.mockReturnValue(['full', 'full', 'full', 'half', 'empty']);
  });

  it('renders product title, description, and price', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('renders category chips for each product tag', () => {
    render(<ProductCard product={product} />);
    const chips = screen.getAllByTestId('mock-category');
    expect(chips).toHaveLength(2);
    expect(chips[0]).toHaveTextContent('Tech'); // viene de capitalize()
    expect(chips[1]).toHaveTextContent('New');
  });

  it('renders star icons based on getStarTypes', () => {
    render(<ProductCard product={product} />);
    const stars = screen.getAllByTestId('mock-star');
    expect(stars).toHaveLength(5);
    expect(stars[0]).toHaveTextContent('full');
    expect(stars[3]).toHaveTextContent('half');
    expect(stars[4]).toHaveTextContent('empty');
  });

  it('shows rating and review count', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('(3 reviews)')).toBeInTheDocument();
  });

  it('calls addToCart when Add to cart button is clicked', () => {
    render(<ProductCard product={product} />);
    fireEvent.click(screen.getByTestId('mock-button'));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

  it('hides loader and shows image after load', () => {
    render(<ProductCard product={product} />);
    const img = screen.getByAltText('Product');
    expect(img).toHaveClass('opacity-0');
    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
  });
});
