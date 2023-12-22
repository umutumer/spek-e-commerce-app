import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import SearchReducer from "./SearchSlice";
import UserReducer from "./UserSlice";
import CartReducer from "./CartSlice";
import FavoriteReducer from "./FavoriteSlice";



const store = configureStore({
    reducer:{
        product: productReducer,
        search:SearchReducer,
        users: UserReducer,
        cart: CartReducer,
        favorite: FavoriteReducer,
    },
});

export default store;