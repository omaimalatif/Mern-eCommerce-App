import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'  
import Home from './pages/Home'
import AdminLayout from './components/Layout/AdminLayout'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './components/ProductDetailPage'
import API from './api/axios' // Adjust this path to wherever your custom Axios API utility lives!
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Logout from './pages/Logout'
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderSuccess from "./pages/OrderSuccess";
import About from './pages/About'
import Contact from './pages/Contact';
import Register from './pages/Register';

export const App = () => {
  const [isSessionReady, setIsSessionReady] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      const token = localStorage.getItem("token");

      // If a token already exists, we can unlock the app immediately
      if (token) {
        setIsSessionReady(true);
        return;
      }

      // If no token exists at all, fetch a temporary guest token right away
      try {
        const response = await API.post("/users/guest"); 
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Guest token generated and saved securely.");
        }
      } catch (error) {
        console.error("Critical: Failed to provision a guest token:", error);
      } finally {
        // Unblock app rendering so the user isn't stuck on a blank screen if the backend is waking up
        setIsSessionReady(true); 
      }
    };

    initializeSession();
  }, []);

  // Show a clean loading screen until the interceptor is guaranteed to have a token to grab
  if (!isSessionReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Initializing shopping session...</p>
        </div>
      </div>
    );
  }


// Inside your <Routes> matrix structure:


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="app/admin-dashboard" element={<AdminLayout />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Dynamic Route: The ':id' token passes the database string straight down to useParams() */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;