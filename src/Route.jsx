import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupScreen } from "./auth/SignupScreen";
import HomeScreen from "./screens/home/HomeScreen";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginScreen } from "./auth/LoginScreen";
import DashboardLayout from "./layouts/DashboardLayout";
function RoutePack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/signup" element={<SignupScreen />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutePack;
