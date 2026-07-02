import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchCartAPI, 
    addToCartAPI, 
    updateCartItemAPI, 
    removeFromCartAPI, 
    clearCartAPI 
} from "../api/cart";

// Async Thunks to trigger API calls seamlessly
export const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async (_, thunkAPI) => {
    try {
        return await fetchCartAPI();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addItemToCart = createAsyncThunk("cart/addItemToCart", async (cartPayload, thunkAPI) => {
    try {
        return await addToCartAPI(cartPayload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// FIXED: Accept full configuration object (productId, quantity, and variant options)
export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem", 
    async ({ productId, quantity, selectedOptions }, thunkAPI) => {
        try {
            // Pass parameters cleanly to your Axios API abstraction engine
            return await updateCartItemAPI({ productId, quantity, selectedOptions });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// FIXED: Accept productId and selectedOptions to ensure the correct item is evicted
export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem", 
    async ({ productId, selectedOptions }, thunkAPI) => {
        try {
            return await removeFromCartAPI({ productId, selectedOptions });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Loading States
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // Handle Rejections/Errors globally
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            // Synchronize fulfilled payloads straight out of the Express database engine returns
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    state.loading = false;
                    
                    // Support both raw arrays or standard wrapper responses (e.g. action.payload.cart.items)
                    if (Array.isArray(action.payload)) {
                        state.items = action.payload;
                    } else if (action.payload?.items) {
                        state.items = action.payload.items;
                    } else if (action.payload?.cart?.items) {
                        state.items = action.payload.cart.items;
                    } else {
                        state.items = [];
                    }
                }
            );
    },
});

export default cartSlice.reducer;