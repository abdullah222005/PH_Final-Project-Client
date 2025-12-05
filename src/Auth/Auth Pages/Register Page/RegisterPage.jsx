import React from "react";
import { useForm } from "react-hook-form";
import profileIcon from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

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
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 font-semibold">Name is Required</p>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 font-semibold">Email is Required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", passwordValidation)}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold">
              {errors.password.message}
            </p>
          )}
          <button className="btn mr-5 md:w-full lg:w-[52%] bg-primary mt-4">
            Register
          </button>
          <p>
            {" "}
            Already have an account?
            <Link to="/auth/login" className="link link-hover">
              Login
            </Link>
          </p>
          <h1 className="text-center text-secondary">Or</h1>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
