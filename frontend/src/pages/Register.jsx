import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice"; // Ensure this asyncThunk action exists in authSlice
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { loading: isSubmitting, user } = useSelector(
    (state) => state.auth
  );

  // Local state form variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Dispatch payload to backend through Thunk architecture
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen flex flex-col justify-between antialiased">
      <Toaster position="bottom-right" />
      <Header />

      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-xs">

          <div className="text-center mb-8">
            <h1 className="text-sm font-black uppercase tracking-wider text-gray-800">
              Create Account
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-2">
              Join us to track orders and save your favorites
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* FULL NAME INPUT */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
              required
            />

            {/* EMAIL ADDRESS INPUT */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
              required
            />

            {/* PASSWORD SECURITY INPUT */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl pr-10 focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* FORM COMPLETION TRIGGER SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-2xs flex justify-center items-center ${
                isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-[#8B5E3C] hover:bg-[#724b2e] active:translate-y-px"
              }`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>

          </form>

          {/* REDIRECT ANCHOR LINK */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8B5E3C] font-bold hover:underline ml-1">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Register;