import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import SearchReducer from "./SearchSlice";
import UserReducer from "./UserSlice";
import CartReducer from "./CartSlice";
import FavoriteReducer from "./FavoriteSlice";
import OrderReducer from "./OrderSlice";



const store = configureStore({
    reducer:{
        product: productReducer,
        search:SearchReducer,
        users: UserReducer,
        cart: CartReducer,
        favorite: FavoriteReducer,
        order: OrderReducer,
    },
});

export default store;