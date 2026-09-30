import React, { useEffect } from "react"; // 1. Import useEffect
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  const token = Cookies.get("accesstoken");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="h-screen w-screen bg-blue-900">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold text-white">Home</h1>
        <p className="text-xl text-white font-semibold mt-4">
          this is a HomePage Under the Working
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
