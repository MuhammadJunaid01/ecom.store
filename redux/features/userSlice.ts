import { IEcomAddress, IUser } from "@/lib/interfaces";
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
        addresses: [],
      } as IUser;
    },
    addDeliveryAddress: (state, action: PayloadAction<IEcomAddress>) => {
      const payload = action.payload;
      const newAdd = {
        ...payload,
        _id: String((state.user?.addresses.length as number) + 1),
      };
      const findIndex = state.user?.addresses.findIndex(
        (address) => address._id == newAdd._id
      );
      const address = [...(state.user?.addresses as IEcomAddress[])];
      if (findIndex != -1 && findIndex !== undefined) {
        state.user?.addresses.splice(findIndex, 1, newAdd);
      } else {
        state.user?.addresses.push(newAdd);
      }
    },
  },
});
export const { loginUser, addDeliveryAddress } = userSlice.actions;
export default userSlice.reducer;
