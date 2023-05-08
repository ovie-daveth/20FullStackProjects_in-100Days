import { createSlice } from "@reduxjs/toolkit";

const initialState =  {name: '', email: '', photoURL: '', uid: ''}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialState},
    reducers: {
        login: function (state, action){
            state.value = action.payload;
        },
        logout: function (state){
            state.value = initialState
        }
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer