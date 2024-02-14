import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/feature/authSlice";
import { authService } from "../appwrite/auth";
import Container from "./Container";

export default function Navbar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const res = await authService.logout();
    if (res.sucess) dispatch(logout());
  };

  const navItems = [
    {
      name: "Blog",
      slug: "/blog",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated,
    },
    {
      name: "Register",
      slug: "/register",
      active: !isAuthenticated,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isAuthenticated,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isAuthenticated,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">Home</Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {isAuthenticated && (
              <li>
                <button
                  type="button"
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
