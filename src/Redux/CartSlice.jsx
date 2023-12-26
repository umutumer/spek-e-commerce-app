import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      return { ...state, data: action.payload };
    },
    removeCart: (state,action) =>{
      const newState = Array.isArray(state) ? state : [];
      return newState.filter((item) => item.id !== action.payload);
    },
    resCart: (state,action) =>{
      return action.payload
    }
  },
});
export const { addCart , removeCart , resCart } = cartSlice.actions;
export default cartSlice.reducer;
