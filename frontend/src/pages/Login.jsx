import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { loading: isSubmitting, user } = useSelector(
    (state) => state.auth
  );

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err || "Invalid credentials.");
    }
  };

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen flex flex-col justify-between antialiased">
      <Toaster position="bottom-right" />
      <Header />

      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-xs">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-2">
              Log in to sync your saved items
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-xl"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded-xl pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8B5E3C] text-white py-3 rounded-xl"
            >
              {isSubmitting ? "Loading..." : "Sign In"}
            </button>

          </form>

          <div className="text-center mt-6">
            <Link to="/register" className="text-[#8B5E3C]">
              Create account
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Login;