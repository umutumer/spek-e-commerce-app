import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import SearchReducer from "./SearchSlice";
import UserReducer from "./UserSlice";
import CartReducer from "./CartSlice";


const store = configureStore({
    reducer:{
        product: productReducer,
        search:SearchReducer,
        users: UserReducer,
        cart: CartReducer,
    },
});

export default store;