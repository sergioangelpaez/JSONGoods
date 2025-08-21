const FilterSidebarSkeleton = () => {
  return (
    <div className="sticky top-0 animate-pulse">
      <div className="mb-3 h-8 w-32 rounded bg-gray-300"></div>
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 w-full rounded bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebarSkeleton;
