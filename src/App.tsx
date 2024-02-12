import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { authService } from "./appwrite/auth";
import { login, logout } from "./redux/feature/authSlice";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
