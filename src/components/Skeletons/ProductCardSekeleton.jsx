const ProductCardSkeleton = () => {
  return (
    <div className="border-gray-border flex animate-pulse flex-col gap-3 rounded-md border bg-white px-3 py-5 shadow-lg">
      {/* Img */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-300">
        {/* Category Chips (simulados como pill rectangulares) */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          <div className="h-5 w-12 rounded-full bg-gray-200"></div>
          <div className="h-5 w-16 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* Product Title */}
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200"></div>
        <div className="h-3 w-5/6 rounded bg-gray-200"></div>
        <div className="h-3 w-2/3 rounded bg-gray-200"></div>
      </div>

      {/* Price + Rating */}
      <div className="flex items-end justify-between">
        {/* Price */}
        <div className="h-6 w-16 rounded bg-gray-300"></div>

        {/* Rating */}
        <div className="flex flex-col items-end gap-2">
          {/* Stars */}
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
          </div>
          {/* Rating number */}
          <div className="h-3 w-20 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Button */}
      <div className="h-10 w-full rounded bg-gray-300"></div>
    </div>
  );
};

export default ProductCardSkeleton;
