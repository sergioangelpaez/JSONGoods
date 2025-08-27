import { useState } from 'react';
import Button from './Button';
import CategoryChip from './CategoryChip';
import { capitalize } from '../utils/stringUtils';
import { getStarTypes } from '../utils/getStarTypes';
import StarIcon from './StarIcon';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="border-border dark:bg-dark-card-bg bg-card-bg flex flex-col gap-3 rounded-md border px-3 py-5 shadow-lg">
      {/* Img */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-white/60">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse rounded-md"></div>}
        <img
          src={product.thumbnail}
          alt="Product"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Category Chip */}
        <div className="absolute top-2 left-2 flex flex-wrap items-center justify-center gap-2">
          {product.tags.map(tag => (
            <CategoryChip key={tag}>{capitalize(tag)}</CategoryChip>
          ))}
        </div>
      </div>

      {/* Product Content */}
      <div>
        <h1 className="text-text-main truncate text-lg font-semibold">{product.title}</h1>
      </div>
      <div className="min-h-[100px]">
        <p className="text-text-secondary line-clamp-5 text-sm">{product.description}</p>
      </div>

      <div className="flex items-baseline-last justify-between">
        <div>
          <p className="text-text-main text-center text-2xl font-semibold">${product.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex">
              {getStarTypes(product.rating).map((type, i) => (
                <StarIcon key={i} type={type} index={i} />
              ))}
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-md font-semibold">{product.rating.toFixed(1)}</p>
              <p className="text-text-secondary text-sm">({product.reviews.length} reviews)</p>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={() => addToCart(product)}>
        <p className="w-full font-semibold">Add to cart</p>
      </Button>
    </div>
  );
};

export default ProductCard;
