const CartItem = ({ item }) => {
  return (
    <div className="grid w-full grid-cols-[0.5fr_1fr]" key={item.id}>
      <div className="bg-accent col-start-1">
        <img src={item.thumbnail} alt="" />
      </div>
      <div className="bg-accent-secondary col-start-2 p-3">
        <p>{item.title}</p>
        <p className="line-clamp-3">{item.description}</p>
        <p>
          {item.price} x {item.quantity} = {item.price * item.quantity}
        </p>
        <div></div>
      </div>
    </div>
  );
};

export default CartItem;
