import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/carts/add_to_carts/', 
        { 
          product_id: product.id, 
          quantity: 1 
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getCartItemsAsync = createAsyncThunk(
  'cart/getCartItems',
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        'http://localhost:8000/carts/list_carts/', 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (!existingItem) {
          state.items.push({
            ...newItem,
            quantity: newItem.quantity,
            totalPrice: newItem.product.price * newItem.quantity
          });
        } else {
          existingItem.quantity += newItem.quantity;
          existingItem.totalPrice += newItem.product.price * newItem.quantity;
        }
        
        state.totalQuantity += newItem.quantity;
        state.totalAmount += newItem.product.price * newItem.quantity;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = action.payload.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      })

      .addCase(getCartItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

  }
});

export default cartSlice.reducer;