import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import { useProducts } from '../../context/ProductContext';

vi.mock('../../context/ProductContext', () => ({
  useProducts: vi.fn(),
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('SearchBar component', () => {
  const mockSetQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useProducts.mockReturnValue({ query: '', setQuery: mockSetQuery });
  });

  it('renders desktop input (hidden in mobile)', () => {
    render(<SearchBar />);
    const desktopInput = screen.getByPlaceholderText(/Search products/i);
    expect(desktopInput).toBeInTheDocument();
  });

  it('toggles mobile search overlay when button is clicked', () => {
    render(<SearchBar />);
    const openBtn = screen.getByLabelText('Open search');
    fireEvent.click(openBtn);

    const [desktopInput, mobileInput] = screen.getAllByRole('textbox');
    expect(desktopInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();

    fireEvent.input(mobileInput, { target: { value: 'laptop' } });
    expect(mobileInput).toHaveValue('laptop');
  });

  it('updates inputValue and debounces setQuery when typing', () => {
    render(<SearchBar />);
    const desktopInput = screen.getByPlaceholderText(/Search products/i);

    fireEvent.input(desktopInput, { target: { value: 'phone' } });
    expect(desktopInput).toHaveValue('phone');
    // Debounced, so not yet called
    expect(mockSetQuery).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(mockSetQuery).toHaveBeenCalledWith('phone');
  });

  it('clears search when clear button is clicked in mobile', () => {
    render(<SearchBar />);
    fireEvent.click(screen.getByLabelText('Open search'));

    const inputs = screen.getAllByRole('textbox');
    const mobileInput = inputs[1];

    fireEvent.input(mobileInput, { target: { value: 'laptop' } });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(mockSetQuery).toHaveBeenCalledWith('laptop');

    const clearButton = screen.getByLabelText('Close search');
    fireEvent.click(clearButton);

    expect(mobileInput).toHaveValue('');
    expect(mockSetQuery).toHaveBeenCalledWith('');
  });

  it('syncs inputValue when query from context changes', () => {
    useProducts.mockReturnValueOnce({ query: 'headphones', setQuery: mockSetQuery });
    render(<SearchBar />);
    const desktopInput = screen.getByPlaceholderText(/Search products/i);
    expect(desktopInput).toHaveValue('headphones');
  });
});
