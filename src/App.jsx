import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Button from './components/Button';
import { useProducts } from './context/ProductContext';
import CartSidebar from './components/CartSidebar';
import ProductCardSkeleton from './components/Skeletons/ProductCardSekeleton';
import { useCart } from './context/CartContext';
import FilterSidebar from './components/FilterSidebar';
import FilterSidebarSkeleton from './components/Skeletons/FilterSidebarSkeleton';

const App = () => {
  const {
    products,
    categories,
    activeCategories,
    loadingCategories,
    setActiveCategories,
    loadMoreProducts,
    loading,
    loadingMore,
    hasMore,
    error,
  } = useProducts();

  const { isCartOpen } = useCart();

  const toggleCategory = category => {
    setActiveCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="text-light-text-main h-full w-full">
      <div className="grid h-full w-full grid-cols-[0.35fr_2fr_0.2fr] grid-rows-[auto_1fr]">
        {/* Header */}
        <Header className="col-start-1 col-end-4" />

        {/* Inner Container */}
        <div className="col-start-1 col-end-4 row-start-2 grid grid-cols-[0.35fr_2fr_0.2fr] gap-5 overflow-auto px-10 py-5">
          <div className="sticky top-0">
            {/* Filters */}
            {loadingCategories ? (
              <FilterSidebarSkeleton />
            ) : (
              <FilterSidebar
                categories={categories}
                activeCategories={activeCategories}
                toggleCategory={toggleCategory}
              />
            )}
          </div>

          {/* Products */}
          <div className="col-start-2 col-end-4">
            <div className="grid-rows-auto border-light-border grid gap-5 border-b-1 pb-5 lg:grid-cols-2 xl:grid-cols-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : products.map(product => <ProductCard key={product.id} product={product} />)}
              {loadingMore
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : null}
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-3 py-5">
              <p className="text-sm">Showing {products.length} products.</p>
              {hasMore && loadMoreProducts && (
                <Button onClick={() => loadMoreProducts()}>
                  <p>Load more products</p>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCartOpen && <CartSidebar>Contenido del carrito</CartSidebar>}
    </div>
  );
};

export default App;
