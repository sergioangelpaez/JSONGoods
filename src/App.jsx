import { useState } from 'react';
import WelcomeSection from './components/WelcomeSection';
import SearchBar from './components/SearchBar';
import FiltersButton from './components/FiltersButton';
import ProductCard from './components/ProductCard';
// import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="h-screen bg-light-bg-main">
      {!started ? (
        <div className='w-full h-full flex items-center justify-center'>
          <WelcomeSection onStart={() => setStarted(true)} />
        </div>
      ) : (
        <div className='w-full h-full p-10 text-light-text-main'>
          <div className='w-full h-full flex'>
            <div className='w-1/7 mr-10'>
              <div className='mb-5 border-light-border border-b-1 pb-3'>
                <p className='text-3xl font-semibold'>Filter products</p>
              </div>
              <div className='mb-10 gap-0.5 flex flex-col'>
                <p className='text-lg font-semibold'>Product Category</p>
                <p className='text-sm'>Beauty</p>
                <p className='text-sm'>Fragances</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
                <p className='text-sm'>Verde</p>
              </div>
              <button className='flex gap-2 bg-accent hover:bg-accent-hover cursor-pointer px-3 py-2 rounded-md text-light-bg-main'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Show More Filters
              </button>
            </div>
            <div className='w-full flex flex-col'>
              <div className='grid grid-cols-5 grid-rows-auto overflow-y-auto gap-5 scroll-'>
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
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
              <div className='w-full flex items-center justify-center py-2'>
                <h1>1 2 3 4 5 6</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}