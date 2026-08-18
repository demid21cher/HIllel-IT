import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error('Помилка завантаження товарів');
    }

    return await response.json();
  }
);

const initialState = {
  items: [],
  products: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },

    removeProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
