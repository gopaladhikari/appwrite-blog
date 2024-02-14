import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) navigate("/login");
  return <Outlet />;
}
