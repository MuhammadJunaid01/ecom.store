import storage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./features/cartSlice";
import { apiSlice } from "./apis/apiSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import searchSlice from "./features/searchSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Combine all the reducers into a root reducer

// Apply persistReducer to the combined reducer
const persistedReducer = persistReducer(persistConfig, cartSlice);
const rootReducer = combineReducers({
  cart: persistedReducer,
  user: userSlice,
  search: searchSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Set up persistor
const persistor = persistStore(store);

// Export types and store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
