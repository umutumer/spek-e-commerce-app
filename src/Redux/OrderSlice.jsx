import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:[],
    reducers:{
        addOrder: (state,action) =>{
          return{  ...state, data: action.payload}
        }
    }
})

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;