import { toCamelCase } from '../utils/stringUtils';

const FilterSidebar = ({ categories, activeCategories, toggleCategory }) => {
  return (
    <div className="sticky top-0">
      <div className="pb-3">
        <p className="truncate text-2xl font-semibold">Filter products</p>
      </div>
      <div className="mb-10 flex flex-col gap-0.5 overflow-y-auto">
        {categories.map(category => (
          <div className="hover:cursor-pointer" key={category}>
            <p
              className={`flex items-center justify-between truncate py-1 text-sm transition-all duration-300 ease-out hover:font-semibold ${
                activeCategories.includes(category)
                  ? 'from-accent-active to-accent my-0.5 rounded-md bg-gradient-to-r px-2 text-white hover:opacity-90 active:scale-95'
                  : ''
              }`}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
