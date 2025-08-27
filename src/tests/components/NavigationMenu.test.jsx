import { render, screen, fireEvent } from '@testing-library/react';
import NavigationMenu from '../../components/NavigationMenu';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('NavigationMenu component', () => {
  const mockSetIsCartOpen = vi.fn();
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useCart.mockReturnValue({
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [],
    });
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
  });

  it('renders cart, theme toggle, and source code buttons', () => {
    render(<NavigationMenu />);
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(screen.getByLabelText('View source code')).toBeInTheDocument();
  });

  it('toggles cart when cart button is clicked', () => {
    render(<NavigationMenu />);
    fireEvent.click(screen.getByLabelText('Cart'));
    expect(mockSetIsCartOpen).toHaveBeenCalledTimes(1);
    expect(mockSetIsCartOpen).toHaveBeenCalledWith(expect.any(Function));
  });

  it('shows cart badge when cartItems has items', () => {
    useCart.mockReturnValue({
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [{ id: 1 }, { id: 2 }],
    });
    render(<NavigationMenu />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<NavigationMenu />);
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('applies extra className when provided', () => {
    render(<NavigationMenu className="extra-class" />);
    expect(screen.getByTestId('navigation-menu').className).toContain('extra-class');
  });
});
