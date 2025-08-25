import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Button from './components/Button';
import { useProducts } from './context/ProductContext';
import CartSidebar from './components/CartSidebar';
import ProductCardSkeleton from './components/Skeletons/ProductCardSekeleton';
import { useCart } from './context/CartContext';
import FilterSidebar from './components/FilterSidebar';
import FilterSidebarSkeleton from './components/Skeletons/FilterSidebarSkeleton';
import Toast from './components/Toast';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
    errors,
    setErrors,
    resultsFromCategorySearch,
  } = useProducts();

  const { isCartOpen, setIsCartOpen } = useCart();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleCategory = category => {
    setActiveCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="text-text-main h-full w-full">
      <div className="grid h-full w-full grid-cols-[0.35fr_2fr_0.2fr] grid-rows-[auto_1fr]">
        {/* Header */}
        <Header className="col-start-1 col-end-4" />

        {/* Inner Container */}
        <div className="bg-bg-main col-start-1 col-end-4 row-start-2 grid grid-cols-[0.4fr_2fr_0.2fr] gap-5 overflow-auto px-5 py-5 md:px-10">
          {/* Filters */}
          <div className="sticky top-0 hidden md:block">
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
          <div className="col-start-1 col-end-4 lg:col-start-2">
            <div className="grid-rows-auto border-light-border grid grid-cols-1 gap-5 border-b-1 pb-5 lg:grid-cols-2 xl:grid-cols-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : products.map(product => <ProductCard key={product.id} product={product} />)}
              {loadingMore
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : null}
            </div>
            {(products.length > 0 || resultsFromCategorySearch.length > 0) && (
              <div className="flex w-full flex-col items-center justify-center gap-3 py-5">
                <p className="text-sm">Showing {products.length} products.</p>
                {hasMore && loadMoreProducts && (
                  <Button onClick={() => loadMoreProducts()}>
                    <p>Load more products</p>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart */}
      <CartSidebar>Contenido del carrito</CartSidebar>

      {/* Error toast */}
      <div className="fixed right-5 bottom-5 flex flex-col gap-3">
        {Object.entries(errors).map(([key, err]) =>
          err ? (
            <Toast
              key={key}
              title={err.title}
              message={err.message}
              variant={err.variant}
              onClose={() => setErrors(prev => ({ ...prev, [key]: null }))}
            />
          ) : null
        )}
      </div>

      {/* Filter Button Mobile */}
      <div className="fixed right-5 bottom-5 z-50 rounded-md text-lg text-white shadow-md shadow-black md:hidden">
        {isFiltersOpen ? (
          <Button onClick={() => setIsFiltersOpen(prev => !prev)}>
            <XMarkIcon className="size-5" />
            <p>Close</p>
          </Button>
        ) : (
          <Button onClick={() => setIsFiltersOpen(prev => !prev)}>
            <AdjustmentsHorizontalIcon className="size-5" />
            <p>Filters</p>
          </Button>
        )}
      </div>

      {/* Filter Sidebar Mobile */}
      {isFiltersOpen && (
        <AnimatePresence>
          {isFiltersOpen && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                className="fixed inset-0 z-[40] bg-black/70 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                onClick={() => setIsFiltersOpen(false)}
              />

              {/* Panel */}
              <motion.aside
                key="panel"
                className="bg-bg-main text-text-main fixed top-0 left-0 z-[50] h-[100dvh] w-3/5 max-w-sm overflow-y-auto p-5 shadow-lg md:hidden"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                onClick={e => e.stopPropagation()}
              >
                <FilterSidebar
                  categories={categories}
                  activeCategories={activeCategories}
                  toggleCategory={toggleCategory}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default App;
