import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { useAppDispatch } from "./redux/store";
import { authService } from "./appwrite/auth";
import { login, logout } from "./redux/feature/authSlice";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddPost from "./pages/AddPost";
import AllPost from "./pages/AllPost";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) dispatch(login({ user }));
      else dispatch(logout());
    };

    getCurrentUser();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="add-post" element={<AddPost />} />
            <Route path="all-posts" element={<AllPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
