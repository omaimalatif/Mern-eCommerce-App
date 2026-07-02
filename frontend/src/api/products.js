import API from "./axios";

// Updated to dynamically handle filter parameter objects
export const getProducts = async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.order) params.append("order", filters.order);

    const res = await API.get(`/products?${params.toString()}`);
    return res.data; // Return full data object to access both products & pagination metadata
};

export const getProductsHome = async () => {
    const res = await API.get("/products?page=1&limit=10&sortBy=createdAt&order=desc");
    return res.data.products;
};
// Ensure the word 'export' is right before the function
// Change 'fetch' to your custom 'API' instance
export const getProductById = async (id) => {
    // Axios automatically handles the base URL (e.g., http://localhost:5000)
    const res = await API.get(`/products/${id}`);
    
    // Axios automatically parses JSON and puts it in res.data
    return res.data; 
};
// Example of how your ../api/cart.js handler methods should process these objects:

export const updateCartItemAPI = async ({ productId, quantity, selectedOptions }) => {
  const response = await API.put("/cart/update", { productId, quantity, selectedOptions });
  return response.data; 
};

export const removeFromCartAPI = async ({ productId, selectedOptions }) => {
  // Pass selectedOptions inside data block for DELETE payloads
  const response = await API.delete("/cart/remove", { data: { productId, selectedOptions } });
  return response.data;
};