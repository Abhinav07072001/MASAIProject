import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './features/productSlice'

// Global Storage
export const store=configureStore({
    reducer:{
        products: productsReducer,  // 'product' state ka naam hai
    },
});