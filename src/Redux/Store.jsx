import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import SearchReducer from "./SearchSlice";
import UserReducer from "./UserSlice";


const store = configureStore({
    reducer:{
        product: productReducer,
        search:SearchReducer,
        users: UserReducer,
    },
});

export default store;