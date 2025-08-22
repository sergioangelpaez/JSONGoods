import { useProducts } from '../context/ProductContext';
import Button from './Button';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ className = '' }) => {
  const { query, setQuery, searchProduct } = useProducts();

  const debouncedSetQuery = useMemo(() => debounce(value => setQuery(value), 1000), [setQuery]);

  return (
    <div className={`w-full ${className} flex items-center justify-center gap-3`}>
      <input
        type="text"
        placeholder="Search products by title, description or category"
        className="hover:border-accent focus:outline-accent w-full max-w-3xl rounded-md border-1 border-gray-300 bg-white p-2"
        value={query}
        onInput={e => debouncedSetQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
