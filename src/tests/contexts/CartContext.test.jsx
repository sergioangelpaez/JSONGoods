import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    // Reset between tests
  });

  it('adds a new product with quantity = 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
    });

    expect(result.current.cartItems).toEqual([{ id: 1, name: 'Product A', quantity: 1 }]);
  });

  it('increases quantity if the product already exists in the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.addToCart({ id: 1, name: 'Product A' });
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('increaseQuantity adds +1 to the correct product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.increaseQuantity(1);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('decreaseQuantity subtracts -1 and removes if it reaches 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.decreaseQuantity(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('updateQuantity changes quantity while respecting minimums', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);

    // does not allow 0 → stays at 1
    act(() => {
      result.current.updateQuantity(1, 0);
    });
    expect(result.current.cartItems[0].quantity).toBe(1);

    // accepts empty string
    act(() => {
      result.current.updateQuantity(1, '');
    });
    expect(result.current.cartItems[0].quantity).toBe('');
  });

  it('removeFromCart deletes a product by id', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('clearCart empties the whole cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, name: 'Product A' });
      result.current.addToCart({ id: 2, name: 'Product B' });
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('handles isCartOpen correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.isCartOpen).toBe(false);

    act(() => {
      result.current.setIsCartOpen(true);
    });

    expect(result.current.isCartOpen).toBe(true);
  });
});
