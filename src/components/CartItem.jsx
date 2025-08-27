import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [localQuantity, setLocalQuantity] = useState(item.quantity.toString());

  useEffect(() => {
    setLocalQuantity(item.quantity.toString());
  }, [item.quantity]);

  const handleChange = e => {
    const value = e.target.value.replace(/\D/g, '');
    setLocalQuantity(value);
  };

  const handleBlur = () => {
    const safeValue = Math.max(1, Number(localQuantity) || 1);
    updateQuantity(item.id, safeValue);
    setLocalQuantity(safeValue.toString());
  };

  return (
    <div className="bg-card-bg border-border text-text-main shadow-accent/50 grid grid-cols-[120px_minmax(0,1fr)] rounded-md border p-3 shadow-md">
      <div className="col-start-1 flex items-center justify-center rounded-l bg-white/60">
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className="col-start-2 flex flex-col gap-4 p-3">
        <div>
          <div className="flex items-center justify-between">
            <div className="w-[90%]">
              <p className="text-text-main truncate text-lg font-bold">{item.title}</p>
            </div>
            <div
              role="button"
              className="group hover:bg-accent cursor-pointer rounded-full p-1"
              onClick={() => removeFromCart(item.id)}
            >
              <XMarkIcon className="stroke-accent size-4 group-hover:stroke-white" />
            </div>
          </div>
          <p className="text-text-secondary line-clamp-3 text-sm">{item.description}</p>
        </div>
        <div className="flex h-[30px] w-full items-center gap-2 font-semibold">
          <p className="text-text-main text-lg">${item.price}</p>
          <p className="text-text-secondary">x</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={localQuantity}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border-accent/50 hover:outline-accent focus:outline-accent h-full w-[50px] rounded border bg-white text-center leading-none text-black hover:outline-1 focus:outline-2"
          />
          <p className="text-text-main text-lg">= ${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
