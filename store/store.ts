import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import usersSliceReducer from "./slices/users"

const store = configureStore({
  reducer: {
    users: usersSliceReducer
  }
})

export type TStore = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch;
export const useAppDispatch: () => TDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector
export default store;