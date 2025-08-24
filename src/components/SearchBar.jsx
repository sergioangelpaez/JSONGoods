import { useProducts } from '../context/ProductContext';
import { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery } = useProducts();

  const [inputValue, setInputValue] = useState(query);

  const debouncedSetQuery = useMemo(() => debounce(value => setQuery(value), 500), [setQuery]);

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
  };

  const handleClear = () => {
    debouncedSetQuery.cancel();
    setQuery('');
    setInputValue('');
  };

  return (
    <div className={`w-full ${className} flex items-center justify-end gap-3 md:justify-center`}>
      {/* Mobile Icon */}
      <button
        className="hover:text-accent cursor-pointer md:hidden"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open search"
      >
        <MagnifyingGlassIcon className="size-6" />
      </button>

      {/* Mobile Search Overlay */}
      {isOpen && (
        <div className="fixed inset-x-0 top-20 z-50 flex flex-col items-center justify-center gap-4 bg-black/50 p-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products by title or description"
              className="hover:border-accent focus:border-accent w-full rounded-md border border-gray-300 bg-white p-3 pr-10 shadow-lg focus:ring-1 focus:outline-none"
              value={inputValue}
              onInput={handleChange}
              autoFocus
            />
            <button
              className="hover:text-accent absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={handleClear}
              aria-label="Close search"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Search */}
      <input
        type="text"
        placeholder="Search products by title or description"
        className="hover:border-accent focus:outline-accent hidden w-full max-w-3xl rounded-md border border-gray-300 bg-white p-2 md:block"
        value={inputValue}
        onInput={handleChange}
      />
    </div>
  );
};

export default SearchBar;
