import { useCart } from '../context/CartContext';

const HeaderIcons = ({ className = '' }) => {
  const { setIsCartOpen, cartItems } = useCart();
  return (
    <div className={`flex items-center justify-end gap-5 ${className}`}>
      {/* Cart + badge */}
      <div className="relative">
        <button
          title="Cart"
          className="hover:text-accent cursor-pointer rounded-full p-1"
          aria-label="Cart"
          onClick={() => setIsCartOpen(prev => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>

        {cartItems.length === 0 ? null : (
          <span className="bg-accent absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-white ring-2 ring-white">
            {cartItems.length}
          </span>
        )}
      </div>

      <a
        href="https://github.com/sergioangelpaez/Filtered-Search-App"
        target="_blank"
        rel="noopener noreferrer"
        title="View source code"
        className="hover:text-accent cursor-pointer rounded-full p-1"
        aria-label="View source code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
      </a>
    </div>
  );
};

export default HeaderIcons;
