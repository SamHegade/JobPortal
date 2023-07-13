import { createSlice } from '@reduxjs/toolkit'
import { set } from 'mongoose'

const initialState = {
    userData:  null,
    userToken: null,
    userType:''
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData : (state, action) => {
        state.userData = action.payload
    },
    setUserToken : (state, action) => {
        state.userToken = action.payload
    }
// ,
//     setUserType:(state,action)=>{
// //         state.userType=action.payload;
//     }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserData  , setUserToken,setUserType } = userSlice.actions

export const UserReducer =  userSlice.reducer