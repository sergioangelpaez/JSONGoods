const ProductCardSkeleton = () => {
  return (
    <div className="border-border flex animate-pulse flex-col gap-3 rounded-md border bg-white px-3 py-5 shadow-lg">
      {/* Img */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-300">
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          <div className="bg-skeleton-light h-5 w-12 rounded-full"></div>
          <div className="bg-skeleton-light h-5 w-16 rounded-full"></div>
        </div>
      </div>

      {/* Product Title */}
      <div className="bg-skeleton-dark h-4 w-3/4 rounded"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="bg-skeleton-light h-3 w-full rounded"></div>
        <div className="bg-skeleton-light h-3 w-5/6 rounded"></div>
        <div className="bg-skeleton-light h-3 w-2/3 rounded"></div>
      </div>

      {/* Price + Rating */}
      <div className="flex items-end justify-between">
        {/* Price */}
        <div className="bg-skeleton-dark h-6 w-16 rounded"></div>

        {/* Rating */}
        <div className="flex flex-col items-end gap-2">
          {/* Stars */}
          <div className="flex gap-1">
            <div className="bg-skeleton-dark h-4 w-4 rounded"></div>
            <div className="bg-skeleton-dark h-4 w-4 rounded"></div>
            <div className="bg-skeleton-dark h-4 w-4 rounded"></div>
            <div className="bg-skeleton-dark h-4 w-4 rounded"></div>
            <div className="bg-skeleton-dark h-4 w-4 rounded"></div>
          </div>
          {/* Rating number */}
          <div className="bg-skeleton-light h-3 w-20 rounded"></div>
        </div>
      </div>

      {/* Button */}
      <div className="bg-skeleton-dark h-10 w-full rounded"></div>
    </div>
  );
};

export default ProductCardSkeleton;
