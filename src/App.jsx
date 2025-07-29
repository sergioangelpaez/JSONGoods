import ProductCard from './components/ProductCard';
import Header from './components/Header';

const App = () => {
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
                <p className="text-lg font-semibold">Product Category</p>
                <p className="text-sm">Beauty</p>
              </div>
              <button className="bg-accent hover:bg-accent-hover text-light-bg-main flex cursor-pointer gap-2 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                Show More Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="col-start-2 col-end-4">
            <div className="grid-rows-auto scroll- grid grid-cols-5 gap-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
            <div className="border-light-border text-light-text-main fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5 rounded-full border bg-white px-5 py-2 shadow">
              <button className="hover:bg-accent-hover hover:text-light-bg-main cursor-pointer rounded-full p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <p className="text-sm">1 2 3 4 5</p>
              <button className="hover:bg-accent-hover hover:text-light-bg-main cursor-pointer rounded-full p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
