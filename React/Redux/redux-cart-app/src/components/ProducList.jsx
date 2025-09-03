import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { products } from "../data";

export default function ProductsList(){
    const dispatch= useDispatch();

    return(
        <div>
            <h2>Product List</h2>
            {products.map((product)=>(
                <div key={product.id} style={{margin: "10px 0"}}>
                    <span>{product.name}- {product.price}</span>
                    <button style={{
                        margin: "10px"
                    }}
                    onClick={()=>dispatch(addToCart(product))}>
                        Add To Cart
                    </button>
                </div>
            ))}
        </div>
    );
}