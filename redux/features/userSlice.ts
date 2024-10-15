import { IUser } from "@/lib/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IState {
  user: IUser | null;
}
const initialState: IState = {
  user: null,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Partial<IUser>>) => {
      const { _id, ...rest } = action.payload;
      state.user = {
        ...rest,
        _id: "1",
      } as IUser;
    },
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
