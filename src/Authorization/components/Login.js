import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const title = "Login";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (loginUser) => {
    const { username, password } = loginUser;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        setInvalidCredentials(true);
        setTimeout(() => {
          setInvalidCredentials(false);
        }, 5000);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <h1 className="text-center text-4xl font-mono">{title}</h1>
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1  tracking-wide font-mono text-gray-600"
              >
                Username:
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  name="username"
                  className={`px-3 py-2 placeholder-slate-300  bg-white rounded text-sm border ${
                    errors.username
                      ? " border-red-400 text-red-600"
                      : "border-slate-300 text-slate-600"
                  }  outline-none focus:outline-none focus:ring w-full`}
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500  font-mono text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1  tracking-wide font-mono text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={`px-3 py-2 placeholder-slate-300 relative  bg-white rounded text-sm border ${
                    errors.password
                      ? " border-red-400 text-red-600"
                      : "border-slate-300 text-slate-600"
                  } outline-none focus:outline-none focus:ring w-full`}
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500  font-mono text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover-bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Login</span>
              </button>
            </div>
            <div className="flex w-full mt-3">
              New to Rs Bank?
              <Link
                to="/auth/register"
                className="text-blue-600 font-mono hover:underline"
              >
                Create an account
              </Link>
            </div>
            {invalidCredentials && (
              <p className="text-red-500 text-sm mt-4 font-mono">
                Invalid credentials. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
