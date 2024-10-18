import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IState {
  categorySearchTerm: string;
  categoryName: string;
}
const initialState: IState = {
  categorySearchTerm: "",
  categoryName: "",
};
const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    searchCategories: (state, action: PayloadAction<string>) => {
      state.categorySearchTerm = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
  },
});
export const { searchCategories, setCategoryName } = searchSlice.actions;
export default searchSlice.reducer;
