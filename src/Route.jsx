import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupScreen } from "./screens/auth-screen/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginScreen } from "./screens/auth-screen/LoginScreen";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminUsers from "./screens/admin-dashboard/AdminUsers";
import AdminCourses from "./screens/CourseScreen";
import AdminEnroll from "./screens/admin-dashboard/AdminEnroll";
import AdminProfile from "./screens/admin-dashboard/AdminProfile";
import UserView from "./screens/admin-dashboard/UserView";
import AdminCreateCourse from "./screens/admin-dashboard/AdminCreateCourse";
import UserDashboard from "./screens/user/UserDashboard";
import CourseDetail from "./container/courses/CourseDetail";
import UserProfile from "./screens/user/UserProfile";
import AdminDashboard from "./screens/admin-dashboard/AdminDashboard";
function RoutePack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/signup" element={<SignupScreen />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/enrollments" element={<AdminEnroll />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/user/all-users" element={<AdminUsers />} />
          <Route path="/admin/courses/:id" element={<CourseDetail />} />{" "}
          <Route path="/admin/courses-create" element={<AdminCreateCourse />} />{" "}
          <Route path="/admin/users/:id" element={<UserView />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutePack;
