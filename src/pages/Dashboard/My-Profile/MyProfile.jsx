import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    region: "",
    postalCode: "",
  });

  // Fetch user profile data
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      // Initialize form data with fetched data
      setFormData({
        name: res.data.name || user?.displayName || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        district: res.data.district || "",
        region: res.data.region || "",
        postalCode: res.data.postalCode || "",
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", user?.email]);
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update profile",
      });
    },
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 5MB",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }
    throw new Error("Image upload failed");
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      let photoURL = profile.photoURL;

      // Upload new image if selected
      if (imageFile) {
        Swal.fire({
          title: "Uploading image...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        photoURL = await uploadImageToImgBB(imageFile);
        Swal.close();
      }

      const updatedData = {
        ...formData,
        photoURL,
      };

      // Update in database
      await updateProfileMutation.mutateAsync(updatedData);

      // Update Firebase auth profile
      if (formData.name !== user?.displayName || photoURL !== user?.photoURL) {
        await updateUserProfile(formData.name, photoURL);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update profile",
      });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
    // Reset form to original data
    setFormData({
      name: profile.name || user?.displayName || "",
      phone: profile.phone || "",
      address: profile.address || "",
      district: profile.district || "",
      region: profile.region || "",
      postalCode: profile.postalCode || "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary text-black gap-2"
          >
            <FaEdit />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Profile Header Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pb-6 border-b">
            {/* Profile Picture */}
            <div className="relative">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      imagePreview ||
                      profile.photoURL ||
                      user?.photoURL ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              {isEditing && (
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm cursor-pointer"
                >
                  <FaCamera />
                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">
                  {profile.name || user?.displayName || "User"}
                </h2>
                {profile.verified && (
                  <MdVerified
                    className="text-blue-500 text-2xl"
                    title="Verified"
                  />
                )}
              </div>
              <p className="text-gray-600 flex items-center gap-2">
                <FaEnvelope className="text-sm" />
                {user?.email}
              </p>
              <div className="mt-3">
                <span className="badge badge-primary badge-outline">
                  {profile.role || "Customer"}
                </span>
                {profile.memberSince && (
                  <span className="badge badge-ghost ml-2">
                    Member since {new Date(profile.memberSince).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Full Name
                  </span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.name || user?.displayName || "Not provided"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaPhone className="text-primary" />
                    Phone Number
                  </span>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Address
                  </span>
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    placeholder="Enter your address"
                    rows="2"
                  />
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.address || "Not provided"}
                  </p>
                )}
              </div>

              {/* Region */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Region/Division
                  </span>
                </label>
                {isEditing ? (
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    <option value="">Select Region</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.region || "Not provided"}
                  </p>
                )}
              </div>

              {/* District */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">District</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Enter your district"
                  />
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.district || "Not provided"}
                  </p>
                )}
              </div>

              {/* Postal Code */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Postal Code</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Enter postal code"
                  />
                ) : (
                  <p className="text-gray-700 py-3 px-4 bg-base-200 rounded-lg">
                    {profile.postalCode || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-outline gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="btn btn-primary gap-2"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FaSave />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Card
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Parcels"
          value={profile.totalParcels || 0}
          icon="📦"
          color="bg-blue-500"
        />
        <StatCard
          title="Delivered"
          value={profile.deliveredParcels || 0}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title="Total Spent"
          value={`৳${profile.totalSpent || 0}`}
          icon="💰"
          color="bg-purple-500"
        />
      </div> */}

      {/* Account Settings
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive updates about your parcels
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
              />
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">
                  Get SMS updates on delivery status
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>

            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Receive promotional offers and news
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-3">
            <button className="btn btn-outline btn-error btn-block">
              Change Password
            </button>
            <button className="btn btn-outline btn-block">
              Download My Data
            </button>
            <button className="btn btn-outline btn-error btn-block">
              Delete Account
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// // Stat Card Component
// const StatCard = ({ title, value, icon, color }) => {
//   return (
//     <div className="card bg-base-100 shadow-md">
//       <div className="card-body">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-gray-600 text-sm">{title}</p>
//             <p className="text-2xl font-bold mt-1">{value}</p>
//           </div>
//           <div
//             className={`text-4xl ${color} w-16 h-16 rounded-full flex items-center justify-center`}
//           >
//             {icon}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyProfile;
