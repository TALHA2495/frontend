import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartAPI } from "../../api/cart";

export const fetchCartDB = createAsyncThunk(
  "cart/fetchDB",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartAPI.getCart();
      return data.items.map(item => ({
        ...item,
        _id: item.productId // map back to _id for frontend consistency
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const syncCartDB = createAsyncThunk(
  "cart/syncDB",
  async (items, { rejectWithValue }) => {
    try {
      const data = await cartAPI.syncCart(items);
      return data.items.map(item => ({
        ...item,
        _id: item.productId
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(
        (item) => item._id === product._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== _id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCart: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncCartDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
