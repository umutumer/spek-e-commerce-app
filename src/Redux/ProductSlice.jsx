import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:'product',
    initialState:[],
    reducers:{
        setProduct:(state,action)=>{
            return action.payload
        },
        upProduct:(state,action) =>{
            return{
                ...state,
                data: action.payload
            }
        },
        delProduct:(state,action) =>{
            return state.filter((item) => item.id !== action.payload)
        },
        setProductField:(state,action) =>{
            return{...state,[action.field]:action.value}
        }
    }
})

export const { setProduct , upProduct , delProduct,setProductField} = productSlice.actions;
export default productSlice.reducer;