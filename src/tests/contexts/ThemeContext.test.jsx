import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  let matchMediaMock;
  let localStorageMock;
  let originalMatchMedia;
  let originalLocalStorage;
  let rootClassList;

  beforeEach(() => {
    // Mock matchMedia
    originalMatchMedia = window.matchMedia;
    matchMediaMock = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;

    // Mock localStorage
    originalLocalStorage = window.localStorage;
    let store = {};
    localStorageMock = {
      getItem: vi.fn(key => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      removeItem: vi.fn(key => {
        delete store[key];
      }),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    // Mock document.documentElement.classList
    rootClassList = {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(),
    };
    Object.defineProperty(document, 'documentElement', {
      value: { classList: rootClassList },
      configurable: true,
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('uses localStorage theme if available', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('theme').textContent).toBe('dark');
    expect(rootClassList.add).toHaveBeenCalledWith('dark');
  });

  it('uses prefers-color-scheme if no localStorage theme', () => {
    localStorageMock.getItem.mockReturnValue(null);
    matchMediaMock.mockReturnValueOnce({
      matches: true,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    });
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('theme').textContent).toBe('dark');
    expect(rootClassList.add).toHaveBeenCalledWith('dark');
  });

  it('defaults to light if no localStorage and prefers-color-scheme is light', () => {
    localStorageMock.getItem.mockReturnValue(null);
    matchMediaMock.mockReturnValueOnce({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    });
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('theme').textContent).toBe('light');
    expect(rootClassList.remove).toHaveBeenCalledWith('dark');
  });

  it('toggleTheme switches theme and updates localStorage and classList', () => {
    localStorageMock.getItem.mockReturnValue('light');
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const button = getByTestId('toggle');
    act(() => {
      button.click();
    });
    expect(getByTestId('theme').textContent).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(rootClassList.add).toHaveBeenCalledWith('dark');
    act(() => {
      button.click();
    });
    expect(getByTestId('theme').textContent).toBe('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(rootClassList.remove).toHaveBeenCalledWith('dark');
  });
});
