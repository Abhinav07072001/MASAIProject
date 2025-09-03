import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/takeSlice';

export const store=configureStore({
    reducer:{
        tasks: taskReducer,
    },
});