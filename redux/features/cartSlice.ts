import { ICartItem, IProduct } from "@/lib/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  wishlist: IProduct[];
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  wishlist: [],
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
        console.log("product not found");
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

    // Increase quantity of an item in the cart
    increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existingCartItem.price;
      }
    },

    // Decrease quantity of an item in the cart
    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem && existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingCartItem.price;
      } else if (existingCartItem && existingCartItem.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalQuantity -= 1;
        state.totalPrice -= existingCartItem.price;
      }
    },

    // Add or remove item from wishlist
    addToWishList: (state, action: PayloadAction<IProduct>) => {
      const isProductExist = state.wishlist.find(
        (list) => list.id === action.payload.id
      );
      if (!isProductExist) {
        state.wishlist.push(action.payload);
      } else {
        state.wishlist = state.wishlist.filter(
          (list) => list.id !== action.payload.id
        );
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

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToWishList,
} = cartSlice.actions;

export default cartSlice.reducer;
