import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import riderImg from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const riderRegion = watch("region");

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const onSubmit = async (data) => {
    console.log("Rider Application Data:", data);

    const riderData = {
      ...data,
      applicationStatus: "Pending",
    };

    try {
      axiosSecure.post("/riders", riderData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted.",
            text: "We will reach out to you in 24 hours. Thank you.",
            showConfirmButton: false,
            timer: 2222,
          });
        }
      });
    } catch (error) {
      console.error("Rider Application Error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-12">
          {/* Header and Image Section */}
          <div className="text-center lg:text-left mb-8 lg:mb-0 lg:pr-12 md:col-span-2">
            <h1 className="text-2xl text-center md:text-4xl font-semibold text-gray-800 leading-tight">
              Be a <span className="text-green-600">Rider</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-222 mx-auto text-center">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>
          {/* Form Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Driving License Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Driving License Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Driving License Number"
                  className={`input input-bordered w-full ${
                    errors.license ? "input-error" : ""
                  }`}
                  {...register("license", {
                    required: "License is required",
                  })}
                />
                {errors.license && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.license.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Region Select */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Region</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("region", {
                      required: "Region is required",
                    })}
                  >
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Select (Dependent on Region) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your District</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("district", {
                      required: "District is required",
                    })}
                  >
                    <option value="">Select your District</option>
                    {districtsByRegion(riderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NID No */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">NID No</span>
                </label>
                <input
                  type="text"
                  placeholder="NID"
                  className={`input input-bordered w-full ${
                    errors.nid ? "input-error" : ""
                  }`}
                  {...register("nid", {
                    required: "NID is required",
                    pattern: {
                      value: /^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/,
                      message: "NID must be 10, 13, or 17 digits",
                    },
                  })}
                />
                {errors.nid && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.nid.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`input input-bordered w-full ${
                    errors.phone ? "input-error" : ""
                  }`}
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Bike Brand/Model/Year */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bike Brand Model and Year</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bajaj Pulsar 150 (2022)"
                  className={`input input-bordered w-full ${
                    errors.bikeModel ? "input-error" : ""
                  }`}
                  {...register("bikeModel", {
                    required: "Bike model/year is required",
                  })}
                />
                {errors.bikeModel && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.bikeModel.message}
                  </p>
                )}
              </div>

              {/* Bike Registration Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bike Registration Number</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dhaka Metro-La 12-3456"
                  className={`input input-bordered w-full ${
                    errors.bikeRegistration ? "input-error" : ""
                  }`}
                  {...register("bikeRegistration", {
                    required: "Registration number is required",
                  })}
                />
                {errors.bikeRegistration && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.bikeRegistration.message}
                  </p>
                )}
              </div>

              {/* About Yourself (Textarea) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tell Us About Yourself</span>
                </label>
                <textarea
                  placeholder="I have 5 years of delivery experience..."
                  className="textarea textarea-bordered h-24 w-full"
                  {...register("bio")}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-control pt-4">
                <button
                  type="submit"
                  className="btn btn-lg bg-green-500 text-white hover:bg-green-600 border-none"
                >
                  {" "}
                  Submit Application
                </button>
              </div>
            </form>
          </div>

          <div className="w-full p-11 flex justify-center items-center">
            {/*  */}
            <img
              src={riderImg} // **IMPORT YOUR IMAGE HERE**
              alt="Delivery Rider on a Scooter"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
