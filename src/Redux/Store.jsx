import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import SearchReducer from "./SearchSlice";


const store = configureStore({
    reducer:{
        product: productReducer,
        search:SearchReducer,
    },
});

export default store;