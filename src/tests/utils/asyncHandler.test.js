import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleAsync } from '../../utils/asyncHandler';

describe('handleAsync', () => {
  let setLoadingState, setError;

  beforeEach(() => {
    setLoadingState = vi.fn();
    setError = vi.fn();
  });

  it('calls setLoadingState(true) before and setLoadingState(false) after', async () => {
    const asyncFn = vi.fn().mockResolvedValue();
    await handleAsync(asyncFn, { setLoadingState, setError });
    expect(setLoadingState).toHaveBeenNthCalledWith(1, true);
    expect(setLoadingState).toHaveBeenLastCalledWith(false);
  });

  it('calls setError(null) if fn resolves', async () => {
    const asyncFn = vi.fn().mockResolvedValue();
    await handleAsync(asyncFn, { setLoadingState, setError });
    expect(setError).toHaveBeenCalledWith(null);
  });

  it('calls setError with error message if fn throws', async () => {
    const error = new Error('fail');
    const asyncFn = vi.fn().mockRejectedValue(error);
    await handleAsync(asyncFn, { setLoadingState, setError });
    expect(setError).toHaveBeenCalledWith('fail');
  });

  it('calls setError with default message if error has no message', async () => {
    const error = {};
    const asyncFn = vi.fn().mockRejectedValue(error);
    await handleAsync(asyncFn, { setLoadingState, setError });
    expect(setError).toHaveBeenCalledWith('Unexpected error.');
  });

  it('calls setLoadingState(false) even if fn throws', async () => {
    const asyncFn = vi.fn().mockRejectedValue(new Error('fail'));
    await handleAsync(asyncFn, { setLoadingState, setError });
    expect(setLoadingState).toHaveBeenLastCalledWith(false);
  });
});
