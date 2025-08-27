import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies outline variant styles when isOutline is true', () => {
    render(<Button isOutline>Outline</Button>);
    const button = screen.getByText(/outline/i);
    expect(button.className).toMatch(/border-accent/);
    expect(button.className).toMatch(/bg-accent\/30/);
  });

  it('applies filled variant styles when isOutline is false', () => {
    render(<Button>Filled</Button>);
    const button = screen.getByText(/filled/i);
    expect(button.className).toMatch(/bg-gradient-to-r/);
    expect(button.className).toMatch(/text-white/);
  });

  it('applies custom className if provided', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText(/custom/i);
    expect(button).toHaveClass('custom-class');
  });
});
