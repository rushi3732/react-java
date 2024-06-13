import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout())
      .then(() => {
        localStorage.removeItem("userToken");
        // Redirect to the login-+66]=
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        navigate("/auth/login");
      });
  }, [dispatch, navigate]);

  return null;
}

export default Logout;
