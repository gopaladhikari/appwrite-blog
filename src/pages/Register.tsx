import { Link } from "react-router-dom";
import Container from "../components/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { Register, registerSchema } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<Register> = (data) => {};

  return (
    <main>
      <Container>
        <div className="mt-8 sm:mt-16 lg:mt-24">
          <div
            className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
          >
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">Blog</span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {/* {errors && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5 mt-8">
                <input
                  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                  placeholder="Enter your full name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-700"> {errors.name.message} </p>
                )}
                <input
                  placeholder="Enter your email"
                  type="email"
                  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-700"> {errors.email.message} </p>
                )}
                <input
                  type="password"
                  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && (
                  <p className="text-red-700"> {errors.password.message} </p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      ;
    </main>
  );
}
