import Button from './Button';
import CategoryChip from './CategoryChip';
import { capitalize } from '../utils/stringUtils';
import { getStarTypes } from '../utils/getStarTypes';
import StarIcon from './StarIcon';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="border-gray-border flex flex-col gap-3 rounded-md border bg-white px-3 py-5 shadow-lg">
      {/* Img */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
        <img
          src={product.thumbnail}
          className="absolute inset-0 h-full w-full object-contain"
          alt="Product"
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
        <h1 className="truncate text-base font-semibold">{product.title}</h1>
      </div>
      <div className="min-h-[100px]">
        <p className="line-clamp-5 text-sm text-gray-600">{product.description}</p>
      </div>
      <div className="flex items-baseline-last justify-between">
        <div>
          <p className="text-light-text-main text-center text-2xl font-semibold">
            ${product.price}
          </p>
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
              <p className="text-sm">({product.reviews.length} reviews)</p>
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
