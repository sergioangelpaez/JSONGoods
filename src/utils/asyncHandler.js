export const handleAsync = async (fn, { setLoadingState, setError }) => {
  try {
    setLoadingState(true);
    await fn();
    setError(null);
  } catch (err) {
    setError(err.message || 'Unexpected error.');
  } finally {
    setLoadingState(false);
  }
};
