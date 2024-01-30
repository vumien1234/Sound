import { routes } from "../../routes/router";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingStatus:false
}

export const globalSlice = createSlice({
	name:'global',
	initialState,
	reducers:{
		toggleLogout : (state) =>{
			localStorage.removeItem('token')
	    	window.location.href = routes.login.path
		},
		toggleLoadingStatus:(state)=>{
			state.loadingStatus = !state.loadingStatus;
		}
	}
})

export const {
  toggleLogout,
  toggleLoadingStatus,
}= globalSlice.actions

export default globalSlice.reducer