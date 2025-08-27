import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../components/CartItem';
import { useCart } from '../../context/CartContext';

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('CartItem component', () => {
  const mockUpdateQuantity = vi.fn();
  const mockRemoveFromCart = vi.fn();

  const mockItem = {
    id: 1,
    title: 'Test Product',
    description: 'A product description',
    price: 50,
    quantity: 2,
    thumbnail: 'test.jpg',
  };

  beforeEach(() => {
    useCart.mockReturnValue({
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    });
    vi.clearAllMocks();
  });

  it('renders item details correctly', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A product description')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument(); // quantity input
    expect(screen.getByText('= $100')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test.jpg');
  });

  it('removes item when remove button is clicked', () => {
    render(<CartItem item={mockItem} />);
    fireEvent.click(screen.getByRole('button')); // XMarkIcon container acts like button
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('updates localQuantity when typing valid numbers', () => {
    render(<CartItem item={mockItem} />);
    const input = screen.getByDisplayValue('2');
    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toBe('5');
  });

  it('filters out non-numeric input', () => {
    render(<CartItem item={mockItem} />);
    const input = screen.getByDisplayValue('2');
    fireEvent.change(input, { target: { value: 'abc3' } });
    expect(input.value).toBe('3'); // only digits kept
  });

  it('calls updateQuantity on blur with a valid number', () => {
    render(<CartItem item={mockItem} />);
    const input = screen.getByDisplayValue('2');
    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.blur(input);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 4);
  });

  it('defaults to 1 if input is empty or invalid on blur', () => {
    render(<CartItem item={mockItem} />);
    const input = screen.getByDisplayValue('2');

    // Case: empty string
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);

    // Case: non-number like "00"
    fireEvent.change(input, { target: { value: '00' } });
    fireEvent.blur(input);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });
});
