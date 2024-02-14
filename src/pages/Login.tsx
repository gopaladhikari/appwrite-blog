import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLogin, loginSchema } from "../schemas/loginSchema";
import { authService } from "../appwrite/auth";
import { login } from "../redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function Login() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) navigate("/");
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const handleClick: SubmitHandler<TLogin> = async (data) => {
    await authService.login(data);
    const user = await authService.getCurrentUser();
    dispatch(login({ user }));
    navigate("/profile");
  };

  return (
    <main className="mt-8 sm:mt-16 lg:mt-24">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">Blog</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
        <form onSubmit={handleSubmit(handleClick)} className="mt-8">
          <div className="space-y-5">
            <input
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-700"> {errors.email.message} </p>
            )}
            <input
              type="password"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-700"> {errors.password.message} </p>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white w-full"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
