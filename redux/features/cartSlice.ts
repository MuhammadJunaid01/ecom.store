// src/redux/slices/cartSlice.ts
import { ICartItem, IProduct } from "@/lib/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const existingCartItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingCartItem) {
        // If the item is already in the cart, just increase the quantity
        existingCartItem.quantity += 1;
      } else {
        // Add the new item to the cart
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    // Remove an item completely from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingCartItem = state.items.find(
        (item) => item.id === productId
      );

      if (existingCartItem) {
        state.totalQuantity -= existingCartItem.quantity;
        state.totalPrice -= existingCartItem.price * existingCartItem.quantity;

        state.items = state.items.filter((item) => item.id !== productId);
      }
    },

    // Update quantity of an item in the cart
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingCartItem = state.items.find((item) => item.id === id);

      if (existingCartItem) {
        const quantityDifference = quantity - existingCartItem.quantity;

        existingCartItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingCartItem.price;
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
