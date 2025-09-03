import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "../features/cartSlice";

function Cart(){
    const {items, total}= useSelector((state)=>state.cart);
    const dispatch=useDispatch();

    return(
        <div className="cart">
            <h2>🛒 Cart</h2>
            {items.length===0?(
                <p>Cart is Empty</p>
            ):(
                <div>
                    {items.map((item)=>(
                        <div key={item.id} className="cart-item">
                             <span>{item.title}</span>
                            <span>₹{item.price}</span>
                            <button onClick={()=>dispatch(removeItem(item.id))}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <h3>Total: ₹{total.toFixed(2)}</h3>
                    <button onClick={() => dispatch(clearCart())}>Clear Cart</button>

                </div>
            )}
        </div>
    );
}

export default Cart;