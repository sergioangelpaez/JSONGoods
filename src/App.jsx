import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Button from './components/Button';
import { useProducts } from './context/ProductContext';
import { toCamelCase } from './utils/stringUtils';
import CartSidebar from './components/CartSidebar';
import { useCart } from './context/CartContext';

const App = () => {
  const {
    products,
    categories,
    activeCategories,
    setActiveCategories,
    applyCategoryFilter,
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
          {/* Filters */}
          <div className="col-start-1 col-end-2">
            <div className="sticky top-0">
              <div className="pb-3">
                <p className="text-2xl font-semibold">Filter products</p>
              </div>
              <div className="mb-10 flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto">
                {categories.map(category => (
                  <div className="hover:cursor-pointer" key={category}>
                    <p
                      className={`flex items-center justify-between truncate py-1 text-sm hover:font-semibold ${activeCategories.includes(category) ? 'bg-accent my-0.5 rounded-md px-2 text-white' : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      {toCamelCase(category)}
                      {activeCategories.includes(category) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-start-2 col-end-4">
            <div className="grid-rows-auto border-light-border grid gap-5 border-b-1 pb-5 lg:grid-cols-2 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-3 py-5">
              <p className="text-sm">Showing {products.length} products.</p>
              {hasMore && (
                <Button onClick={loadMoreProducts}>
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
