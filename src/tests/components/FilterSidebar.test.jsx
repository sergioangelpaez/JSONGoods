import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../../components/FilterSidebar';
import { toCamelCase } from '../../utils/stringUtils';

vi.mock('../../utils/stringUtils', () => ({
  toCamelCase: vi.fn(),
}));

describe('FilterSidebar component', () => {
  const mockToggleCategory = vi.fn();
  const categories = ['electronics', 'furniture', 'clothing'];

  beforeEach(() => {
    vi.clearAllMocks();
    toCamelCase.mockImplementation(str => str); // default: return same string
  });

  it('renders the title', () => {
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={[]}
        toggleCategory={mockToggleCategory}
      />
    );
    expect(screen.getByText('Filter products')).toBeInTheDocument();
  });

  it('renders all categories', () => {
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={[]}
        toggleCategory={mockToggleCategory}
      />
    );
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('applies active styles and shows icon when category is active', () => {
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={['electronics']}
        toggleCategory={mockToggleCategory}
      />
    );

    const activeCategory = screen.getByText('electronics');
    expect(activeCategory.className).toMatch(/bg-gradient-to-r/); // has active style
    expect(screen.getByTestId('heroicon-x-mark')).toBeInTheDocument();
  });

  it('does not show icon when category is inactive', () => {
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={[]}
        toggleCategory={mockToggleCategory}
      />
    );

    expect(screen.queryByTestId('heroicon-x-mark')).not.toBeInTheDocument();
  });

  it('calls toggleCategory when clicking a category', () => {
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={[]}
        toggleCategory={mockToggleCategory}
      />
    );

    fireEvent.click(screen.getByText('furniture'));
    expect(mockToggleCategory).toHaveBeenCalledWith('furniture');
  });

  it('uses toCamelCase for category labels', () => {
    toCamelCase.mockImplementation(str => `camel-${str}`);
    render(
      <FilterSidebar
        categories={categories}
        activeCategories={[]}
        toggleCategory={mockToggleCategory}
      />
    );

    categories.forEach(category => {
      expect(screen.getByText(`camel-${category}`)).toBeInTheDocument();
    });
  });
});
