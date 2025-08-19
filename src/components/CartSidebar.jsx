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
        className="bg-opacity-50 light-text-main fixed inset-0 z-40 bg-black/70"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart */}
      <aside className="bg-light-bg-main light-text-main fixed top-0 right-0 z-50 flex h-full w-120 flex-col justify-between p-5 shadow-lg">
        <div className="grid h-full grid-rows-[auto_1fr_auto]">
          <div className="row-start-1 mb-5 flex w-full">
            <Button onClick={() => setIsCartOpen(prev => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <p className="text-sm">Back to catalog</p>
            </Button>
          </div>

          {/* Cart Items */}
          <div className="row-start-2 row-end-3 overflow-y-auto">
            <h2 className="border-b-light-border mb-4 border-b-1 pb-3 text-2xl font-semibold">
              Your cart
            </h2>
            <div className="flex flex-col gap-3">
              {cartItems.map(item => (
                <CartItem item={item} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-light-border row-start-3 grid grid-cols-[auto_1fr] gap-3 border-t py-2">
            <Button className="w-fit" isOutline={true}>
              <p>Clear cart</p>
            </Button>
            <Button className="">
              <p>Go to checkout</p>
            </Button>
          </div>
        </div>
      </aside>
    </>,
    document.body
  );
}
