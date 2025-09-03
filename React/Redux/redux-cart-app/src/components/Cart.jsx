import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";

export default function Cart() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>🛒 Cart</h2>
      {items.length === 0 ? <p>No items in cart</p> : null}
      {items.map((item, index) => (
        <div key={index} style={{ margin: "10px 0" }}>
          <span>{item.name} - ₹{item.price}</span>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => dispatch(removeFromCart(item))}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      {items.length > 0 && (
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      )}
    </div>
  );
}
