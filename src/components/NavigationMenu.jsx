import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, CodeBracketIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const NavigationMenu = ({ className = '' }) => {
  const { setIsCartOpen, cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center justify-end gap-5 ${className}`}>
      {/* Desktop Menu */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Cart + badge */}
        <div className="relative">
          <button
            title="Cart"
            className="hover:text-accent text-text-main cursor-pointer rounded-full p-1"
            aria-label="Cart"
            onClick={() => setIsCartOpen(prev => !prev)}
          >
            <ShoppingCartIcon className="size-6" />
          </button>

          {cartItems.length > 0 && (
            <span className="bg-accent absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-white ring-2 ring-white">
              {cartItems.length}
            </span>
          )}
        </div>
        <button
          title="Toggle theme"
          className="hover:text-accent cursor-pointer rounded-full p-1"
          aria-label="Toggle theme"
          onClick={() => toggleTheme()}
        >
          <MoonIcon className="size-6" />
        </button>
        <a
          href="https://github.com/sergioangelpaez/Filtered-Search-App"
          target="_blank"
          rel="noopener noreferrer"
          title="View source code"
          className="hover:text-accent cursor-pointer rounded-full p-1"
          aria-label="View source code"
        >
          <CodeBracketIcon className="size-6" />
        </a>
      </div>
    </div>
  );
};

export default NavigationMenu;
