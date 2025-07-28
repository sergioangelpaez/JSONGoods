const SearchBar = () => {
    return (
        <div className="w-full h-[20px]">
            <input
                type="text"
                placeholder="Search products by title, description or category"
                className="w-full
                           p-2
                           border-1 border-gray-300 rounded-md
                           bg-white
                           hover:border-accent-secondary focus:outline-accent-secondary"
            />
        </div>
    );
};

export default SearchBar;