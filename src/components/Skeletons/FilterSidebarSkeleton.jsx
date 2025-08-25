const FilterSidebarSkeleton = () => {
  return (
    <div className="sticky top-0 animate-pulse">
      <div className="bg-card-bg mb-3 h-8 w-32 rounded"></div>
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card-bg h-5 w-full rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebarSkeleton;
