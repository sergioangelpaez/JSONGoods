export const handleAsync = async (fn, { setLoadingState, setError }) => {
  try {
    setLoadingState(true);
    setError(null);
    await fn();
  } catch (err) {
    setError(err.message || 'Unexpected error.');
  } finally {
    setLoadingState(false);
  }
};
