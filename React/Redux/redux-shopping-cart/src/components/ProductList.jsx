import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { fetchProducts } from "../features/productSlice";

function ProductList(){
    const dispatch= useDispatch();
    const {items, loading, error}= useSelector((state)=>state.products);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    if(loading) return <h2>Loading...</h2>;
    if(error) return <p>Error:{error}</p>;

    return (
        <div className="products">
            <h2>Products</h2>
            <div className="product-grid">
                {items.map((p)=>(
                    <div key={p.id} className="product-card">
                        <h3>{p.title}</h3>
                        <p>₹ {p.price}</p>
                        <button onClick={()=>dispatch(addItem(p))}> 
                            Add To Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;