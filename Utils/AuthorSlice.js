import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    AuthorData:  null,
    AuthorToken: null,
}

export const AuthorSlice = createSlice({
  name: 'Author',
  initialState,
  reducers: {
    setAuthorData : (state, action) => {
        state.AuthorData = action.payload
    },
    setAuthorToken : (state, action) => {
        state.AuthorToken = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setAuthorData  , setAuthorToken } = AuthorSlice.actions

export const AuthorReducer =  AuthorSlice.reducer