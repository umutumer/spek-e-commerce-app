import { createSlice } from "@reduxjs/toolkit";



const favoriteSlice = createSlice({
    name:'favorite',
    initialState:[],
    reducers:{
        addFavorite:(state,action) =>{
            return{...state, data:action.payload}
        },
        delFavorite: (state,action) =>{
            const newState = Array.isArray(state) ? state : [];
            return newState.filter((item) => item.id !== action.payload);
        }
    }
})

export const {addFavorite , delFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;