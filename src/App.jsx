import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Button from './components/Button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useProducts } from './context/ProductContext';
import { useEffect } from 'react';

const App = () => {
  const { products, categories, loadMoreProducts, loading, loadingMore, hasMore, error } =
    useProducts();

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
              <div className="mb-5 pb-3">
                <p className="text-2xl font-semibold">Filter products</p>
              </div>
              <div className="mb-10 flex flex-col gap-0.5">
                {categories.map(category => (
                  <p className="text-sm">{category}</p>
                ))}
              </div>
              <Button>
                <AdjustmentsHorizontalIcon className="size-6" />
                <p>Show more filters</p>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="col-start-2 col-end-4">
            <div className="grid-rows-auto scroll- border-light-border grid grid-cols-5 gap-5 border-b-1 pb-5">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-3 py-5">
              <p className="text-sm">Showing 10 out of 100 products</p>
              <Button onClick={loadMoreProducts}>
                <p>Load more products</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
