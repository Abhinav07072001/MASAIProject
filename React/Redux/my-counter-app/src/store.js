import {configureStore} from '@reduxjs/toolkit'
import counerReducer from './features/counterSlice.js'

const store= configureStore({
    reducer:{
        counter: counerReducer,
    },
});

export default store;