import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:[],
    reducers:{
        addOrder: (state,action) =>{
          return{  ...state, data: action.payload}
        },
        upOrder: (state,action) =>{
          return{  ...state, data: action.payload}
        }
    }
})

export const {addOrder , upOrder} = orderSlice.actions;
export default orderSlice.reducer;