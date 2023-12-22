import { createSlice } from "@reduxjs/toolkit";



const favoriteSlice = createSlice({
    name:'favorite',
    initialState:[],
    reducers:{
        addFavorite:(state,action) =>{
            return{...state, data:action.payload}
        },
        delFavorite: (state,action) =>{
            return state.filter((item) => item.id !== action.payload)
        }
    }
})

export const {addFavorite , delFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;