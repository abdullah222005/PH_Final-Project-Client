import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Social Login/GoogleLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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
        "Password must contain uppercase, lowercase, number, special character & be at least 8 characters",
    },
  };

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        //Image processing
        const formData = new FormData();
        formData.append("image", profileImg);
        const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        //Image posting and profile update
        axios.post(img_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          //create user in db
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL
          }
          axiosSecure.post('/users', userInfo)
          .then(res=>{
            if(res.data.insertedId){
              console.log('user created in the db', res.data);
            }
          })

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then((result) => {
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="my-10 md:my-15 lg:my-22">
      <h1 className="text-2xl md:text-4xl font-semibold">Create an Account</h1>
      <p className="text-gray-700 mt-2 mb-6">Register with ZapShift</p>
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
          <label className="label">Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", {
              required: "Photo is required",
              validate: {
                fileType: (value) =>
                  value &&
                  value[0] &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                  ].includes(value[0].type)
                    ? true
                    : "Only JPG, PNG, or WEBP allowed",

                fileSize: (value) =>
                  value && value[0] && value[0].size < 2 * 1024 * 1024
                    ? true
                    : "Image must be smaller than 2MB",
              },
            })}
            className="file-input file-input-neutral bg-primary"
          />
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
          <button className="btn md:w-full bg-primary mt-4">Register</button>
          <p className="text-[15px]">
            {" "}
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/auth/login"
              className="link link-hover text-secondary font-semibold"
            >
              Login
            </Link>
          </p>
          <GoogleLogin />
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
