import React from "react";
import { useForm } from "react-hook-form";
import profileIcon from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import GoogleLogin from "../Social Login/GoogleLogin";

const RegisterPage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
    const {registerUser} = useAuth();

    const passwordValidation = {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    };

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
    .then(result => {
        console.log(result.user);    
    })
    .catch(error =>{
        console.log(error.message);
    })
  };

  return (
    <div className="my-10 md:my-15 lg:my-22">
      <h1 className="text-2xl md:text-4xl font-semibold">Create an Account</h1>
      <p className="text-gray-700 mt-2 mb-6">Register with ZapShift</p>
      <img src={profileIcon} alt="" />
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="name"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 font-semibold">Name is Required</p>
          )}
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
            {...register("password", passwordValidation)}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold">
              {errors.password.message}
            </p>
          )}
          <button className="btn md:w-full bg-primary mt-4">
            Register
          </button>
          <p className="text-[15px]">
            {" "}
            Already have an account?{" "}
            <Link to="/auth/login" className="link link-hover text-secondary font-semibold">
              Login
            </Link>
          </p>
          <GoogleLogin/>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
