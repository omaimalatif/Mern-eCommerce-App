import API from "./axios";

// Fetch current authenticated user cart
export const fetchCartAPI = async () => {
    const res = await API.get("/cart");
    return res.data;
};

// Add new item
export const addToCartAPI = async (payload) => {
    const res = await API.post("/cart/add", payload);
    return res.data;
};

// FIXED
export const updateCartItemAPI = async (payload) => {
    const res = await API.put("/cart/update", payload);
    return res.data;
};

// FIXED
export const removeFromCartAPI = async (payload) => {
    const res = await API.delete("/cart/remove", {
        data: payload,
    });

    return res.data;
};

// Clear cart
export const clearCartAPI = async () => {
    const res = await API.delete("/cart/clear");
    return res.data;
};