import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../modules/auth/slice';
import globalReducer from '../components/Global/slice'

const store = configureStore({
    reducer:{
      global:globalReducer,
      auth:authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store