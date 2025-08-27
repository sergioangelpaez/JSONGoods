import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
import { useProducts } from '../../context/ProductContext';

vi.mock('../../components/SearchBar', () => ({
  default: ({ className }) => <div data-testid="search-bar" className={className} />,
}));
vi.mock('../../components/NavigationMenu', () => ({
  default: ({ className }) => <div data-testid="nav-menu" className={className} />,
}));

vi.mock('../../context/ProductContext', () => ({
  useProducts: vi.fn(),
}));

describe('Header component', () => {
  const mockReloadApp = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useProducts.mockReturnValue({ reloadApp: mockReloadApp });
  });

  it('renders the title with correct text', () => {
    render(<Header />);
    expect(screen.getByText('JSON Goods')).toBeInTheDocument();
  });

  it('calls reloadApp when title is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('JSON Goods'));
    expect(mockReloadApp).toHaveBeenCalledTimes(1);
  });

  it('renders SearchBar and NavigationMenu with proper props', () => {
    render(<Header />);
    const searchBar = screen.getByTestId('search-bar');
    const navMenu = screen.getByTestId('nav-menu');

    expect(searchBar).toHaveClass('col-start-2 col-end-3');
    expect(navMenu).toHaveClass('col-start-3');
  });

  it('applies extra className when provided', () => {
    render(<Header className="extra-class" />);
    const header = screen.getByTestId('header');
    expect(header.className).toContain('extra-class');
  });
});
