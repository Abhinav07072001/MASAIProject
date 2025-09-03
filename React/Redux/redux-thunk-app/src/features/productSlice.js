import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async Thunk: API se products fetch karega
export const fetchProducts=createAsyncThunk(
      "products/fetchProducts",  // action type
    async ()=>{
        const res= await fetch("https://fakestoreapi.com/products");
        const data= await res.json();
        return data; // -> action.payload ban jayega

    }  
);

// ✅ Slice: state + reducers define karta hai
const productSlice= createSlice({
    name:"products",
    initialState:{
        items:[],
        status:"idle",  // idle | loading | succeeded | failed
        error:null,
    },
    reducers:{},

    // ✅ Async thunk ke 3 states handle karne ke liye extraReducers
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.status="loading";
            })
            .addCase(fetchProducts.fulfilled, (state,action)=>{
                state.status="succeeded";
                state.items=action.payload; // API sa jo data aayega

            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status="failed",
                state.error=action.error.message;
            });
    },
});

export default productSlice.reducer;