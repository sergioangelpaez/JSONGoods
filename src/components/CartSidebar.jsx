import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, clearCart } = useCart();

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Panel */}
          <motion.aside
            key="cart"
            className="bg-bg-main text-text-main fixed top-0 right-0 z-50 flex h-full w-full flex-col justify-between p-5 shadow-lg md:w-120"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="grid h-full grid-rows-[auto_1fr_auto]">
              {/* Header */}
              <div className="row-start-1 mb-5 flex w-full">
                <Button onClick={() => setIsCartOpen(false)}>
                  <ChevronLeftIcon className="size-5" />
                  <p className="text-sm">Back to catalog</p>
                </Button>
              </div>

              {/* Cart Items */}
              <div className="row-start-2 row-end-3 overflow-y-auto">
                <h2 className="border-b-light-border mb-4 border-b-1 pb-3 text-2xl font-semibold">
                  Your cart
                </h2>
                <div className="flex h-[90%] flex-col gap-3">
                  {cartItems.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-text-main">Looks like you haven’t added anything yet.</p>
                    </div>
                  ) : (
                    cartItems.map(item => <CartItem key={item.id} item={item} />)
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-light-border row-start-3 grid grid-cols-[auto_1fr] gap-3 border-t py-2">
                <Button className="w-fit" isOutline={true} onClick={clearCart}>
                  <p>Clear cart</p>
                </Button>
                <Button className="">
                  <p>Go to checkout</p>
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
