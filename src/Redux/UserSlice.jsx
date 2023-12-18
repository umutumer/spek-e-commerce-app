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
        },
        loginUser:(state,action) =>{
            return{
                ...state,
                isLogin:true,
                userId:action.userId,
            }
        },
        logoutUser:(state,action) =>{
            return{
                ...state,
                isLogin:false,
                userId:action.userId,
            }
        }
    }
})
export const {setUser,upUser,delUser,setUserField,loginUser,logoutUser} =userSlice.actions;
export default userSlice.reducer;