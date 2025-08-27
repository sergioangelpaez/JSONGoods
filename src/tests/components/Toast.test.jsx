import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '../../components/Toast';

describe('Toast component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not render when message is empty', () => {
    const { container } = render(<Toast />);
    expect(container.firstChild).toBeNull();
  });

  it('renders with correct title and message', () => {
    render(<Toast title="Info" message="Hello world" />);
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies correct classes and icon for "warning" variant', () => {
    render(<Toast message="Watch out!" variant="warning" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-yellow-500'); // containerClass
    expect(screen.getByTestId('heroicon-exclamation-triangle')).toBeInTheDocument();
  });

  it('calls onClose automatically after duration', () => {
    const onClose = vi.fn();
    render(<Toast message="Auto close" variant="message" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000); // duration of "message"
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not auto close when variant has no duration (error)', () => {
    const onClose = vi.fn();
    render(<Toast message="Critical!" variant="error" onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when clicking the close button', () => {
    const onClose = vi.fn();
    render(<Toast message="Dismiss me" onClose={onClose} />);
    const btn = screen.getByLabelText('Cerrar notificación');
    fireEvent.click(btn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
