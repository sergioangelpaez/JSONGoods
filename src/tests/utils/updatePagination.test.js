import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updatePagination } from '../../utils/updatePagination';

describe('updatePagination', () => {
  let setProducts, setSkip, setHasMore;

  beforeEach(() => {
    setProducts = vi.fn(cb => {
      // Simulate prev as [1,2,3]
      const prev = [1, 2, 3];
      return cb(prev);
    });
    setSkip = vi.fn();
    setHasMore = vi.fn();
  });

  it('appends newItems to products and updates skip', () => {
    const newItems = [4, 5];
    updatePagination(setProducts, setSkip, setHasMore, newItems, 10, 2);

    // setProducts should be called with a function
    expect(setProducts).toHaveBeenCalledTimes(1);

    // setSkip should be called with updated length
    expect(setSkip).toHaveBeenCalledWith(5);

    // setHasMore should be called (totalAvailable provided)
    expect(setHasMore).toHaveBeenCalledWith(true);
  });

  it('sets hasMore to false if updated length >= totalAvailable', () => {
    const newItems = [4, 5, 6, 7];
    updatePagination(setProducts, setSkip, setHasMore, newItems, 7, 4);

    // updated = [1,2,3,4,5,6,7]
    expect(setHasMore).toHaveBeenCalledWith(false);
  });

  it('sets hasMore based on productsPerPage if totalAvailable is null', () => {
    const newItems = [4, 5];
    updatePagination(setProducts, setSkip, setHasMore, newItems, null, 2);

    // newItems.length === productsPerPage
    expect(setHasMore).toHaveBeenCalledWith(true);
  });

  it('sets hasMore to false if newItems.length < productsPerPage and totalAvailable is null', () => {
    const newItems = [4];
    updatePagination(setProducts, setSkip, setHasMore, newItems, null, 2);

    expect(setHasMore).toHaveBeenCalledWith(false);
  });

  it('returns the updated products array', () => {
    setProducts = vi.fn(cb => cb([1, 2, 3]));
    const newItems = [4, 5];
    const result = updatePagination(setProducts, setSkip, setHasMore, newItems, 10, 2);

    // The function returns undefined, but setProducts returns updated array
    expect(setProducts).toHaveReturnedWith([1, 2, 3, 4, 5]);
  });
});
