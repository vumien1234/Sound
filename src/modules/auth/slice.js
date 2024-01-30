import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated : false
}

export const authSlice = createSlice({
	name:'auth',
	initialState,
	reducers:{
		cleanup: (state) => {
			state.status = false;
			localStorage.clear();
		},
		setAuthenticated:(state,action) => {
			state.isAuthenticated = action.payload
		}
	}
})

export const {setAuthenticated,cleanup} = authSlice.actions
export default authSlice.reducer