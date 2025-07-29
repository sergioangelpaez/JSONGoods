const SearchBar = ({ className = '' }) => {
  return (
    <div className={`w-full ${className} flex items-center justify-center`}>
      <input
        type="text"
        placeholder="Search products by title, description or category"
        className="hover:border-accent focus:outline-accent w-full max-w-3xl rounded-md border-1 border-gray-300 bg-white p-2"
      />
    </div>
  );
};

export default SearchBar;
