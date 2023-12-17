import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:'user',
    initialState:[],
    reducers:{
        setUser:(state,action) =>{
           return action.payload
        },
        upUser:(state,action) =>{
            return{
                ...state,
                user: action.payload
            }
        },
        delUser:(state,action) =>{
            return state.filter((user) => user.id !== action.payload)
        },
        setUserField:(state,action) =>{
            return{...state,[action.field]:action.value}
        }
    }
})
export const {setUser,upUser,delUser,setUserField} =userSlice.actions;
export default userSlice.reducer;