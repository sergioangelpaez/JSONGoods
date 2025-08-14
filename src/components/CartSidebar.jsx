import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import CartItem from './CartItem';

export default function CartSidebar() {
  const { cartItems, setIsCartOpen } = useCart();

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="bg-opacity-50 fixed inset-0 z-40 bg-black/70"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart */}
      <aside className="bg-light-bg-main fixed top-0 right-0 z-50 h-full w-120 p-5 shadow-lg">
        <div className="mb-5 flex w-full" onClick={() => setIsCartOpen(prev => !prev)}>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

            <p className="text-sm">Back to catalog</p>
          </Button>
        </div>
        <h2 className="border-b-light-border mb-4 border-b-1 pb-3 text-2xl font-semibold">
          Tu carrito
        </h2>
        {cartItems.map(item => (
          <CartItem item={item} />
        ))}
      </aside>
    </>,
    document.body
  );
}
