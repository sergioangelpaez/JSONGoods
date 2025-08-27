export const updatePagination = (
  setProducts,
  setSkip,
  setHasMore,
  newItems,
  totalAvailable = null,
  productsPerPage = 20
) => {
  setProducts(prev => {
    const updated = [...prev, ...newItems];
    setSkip(updated.length);

    if (totalAvailable !== null) {
      setHasMore(updated.length < totalAvailable);
    } else {
      setHasMore(newItems.length === productsPerPage);
    }

    return updated;
  });
};
