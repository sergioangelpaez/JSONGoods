import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import Button from './Button';

const SearchBar = ({ className = '' }) => {
  const { searchProduct } = useProducts();
  const [query, setQuery] = useState('');

  return (
    <div className={`w-full ${className} flex items-center justify-center gap-3`}>
      <input
        type="text"
        placeholder="Search products by title, description or category"
        className="hover:border-accent focus:outline-accent w-full max-w-3xl rounded-md border-1 border-gray-300 bg-white p-2"
        value={query}
        onInput={e => setQuery(e.target.value)}
        onKeyDown={e => (e.key === 'Enter' ? searchProduct(query) : null)}
      />
      <Button className="text-md h-full w-[100px]" onClick={() => searchProduct(query)}>
        <p>Search</p>
      </Button>
    </div>
  );
};

export default SearchBar;
