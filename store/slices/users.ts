
import { TUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  data: null | TUser[],
  status: "null" | "pending" | "fullfilled";
}

const initialState: TInitialState = {
  data: null,
  status: "null"
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state = {data: action.payload, status: "fullfilled"}
      return state
    }
  },
  extraReducers(builder) {
  },
})

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;