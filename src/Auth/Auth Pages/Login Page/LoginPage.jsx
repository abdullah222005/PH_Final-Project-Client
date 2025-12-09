import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Social Login/GoogleLogin";

const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser} = useAuth();

  const handleSignIn = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  return (
    <div className="my-10 md:my-15 lg:my-22">
      <h1 className="text-2xl md:text-4xl font-semibold">Welcome Back</h1>
      <p className="text-gray-700 mt-2 mb-6">Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 font-semibold">Email is Required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 font-semibold">Password is Required</p>
          )}
          <div>
            <a className="link link-hover text-[15px]">Forgot password?</a>
          </div>
          <button className="btn md:w-full bg-primary mt-4">Login</button>
          <p className="text-[15px]">
            {" "}
            Don't have any account?{" "}
            <Link state={location.state}
              to="/auth/register"
              className="link link-hover text-secondary font-semibold"
            >
              Register
            </Link>
          </p>
        </fieldset>
        <GoogleLogin/>
      </form>
    </div>
  );
};

export default LoginPage;
