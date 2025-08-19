import { useCart } from '../context/CartContext';
const CartItem = ({ item }) => {
  const { updateQuantity } = useCart();
  return (
    <div
      className="bg-light-card-bg border-gray-border text-light-text-main grid grid-cols-[120px_minmax(0,1fr)] rounded-md border shadow-md"
      key={item.id}
    >
      <div className="col-start-1 flex items-center justify-center">
        <img src={item.thumbnail} alt={item.tittle} />
      </div>
      <div className="col-start-2 flex flex-col gap-4 p-3">
        <div>
          <div className="flex items-center justify-between">
            <div className="w-[90%]">
              <p className="truncate text-lg font-bold">{item.title}</p>
            </div>
            <div className="group hover:bg-accent cursor-pointer rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                className="stroke-accent size-4 group-hover:stroke-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <p className="line-clamp-3 text-sm text-gray-600">{item.description}</p>
        </div>
        <div className="flex h-[30px] w-full items-center gap-2 font-semibold">
          <p className="text-lg">${item.price}</p>
          <p className="text-gray-600">x</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={e => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
            className="border-accent/50 h-full w-[50px] rounded border text-center leading-none"
          />
          <p className="text-lg">= ${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
