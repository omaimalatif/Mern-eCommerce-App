import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());   // clear auth
    navigate("/login");       // redirect
  }, [dispatch, navigate]);

  return null; // no UI needed
};

export default Logout;