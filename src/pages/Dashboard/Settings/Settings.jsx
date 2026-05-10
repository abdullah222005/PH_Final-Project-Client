import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBell,
  FaLock,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaDownload,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaKey,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { MdEmail, MdSms, MdNotifications, MdSecurity } from "react-icons/md";
import Swal from "sweetalert2";

const Settings = () => {
  const { user, updatePassword } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State Management
  const [activeTab, setActiveTab] = useState("notifications");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user settings
  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ["userSettings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/settings/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings) => {
      const res = await axiosSecure.patch(
        `/users/settings/${user.email}`,
        updatedSettings,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userSettings", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Settings Updated!",
        text: "Your preferences have been saved",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  // Handle notification toggle
  const handleNotificationToggle = (key, value) => {
    const updatedSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    };
    updateSettingsMutation.mutate(updatedSettings);
  };

  // Handle privacy toggle
  const handlePrivacyToggle = (key, value) => {
    const updatedSettings = {
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value,
      },
    };
    updateSettingsMutation.mutate(updatedSettings);
  };

  // Handle appearance settings
  const handleAppearanceChange = (key, value) => {
    const updatedSettings = {
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    };
    updateSettingsMutation.mutate(updatedSettings);

    // Apply theme immediately
    if (key === "theme") {
      document.documentElement.setAttribute("data-theme", value);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirmation do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      await updatePassword(passwordData.newPassword);

      Swal.fire({
        icon: "success",
        title: "Password Changed!",
        text: "Your password has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to change password",
      });
    }
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone. All your data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
      input: "text",
      inputPlaceholder: "Type 'DELETE' to confirm",
      inputValidator: (value) => {
        if (value !== "DELETE") {
          return "Please type DELETE to confirm";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user.email}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  // Handle data download
  const handleDownloadData = async () => {
    try {
      Swal.fire({
        title: "Preparing your data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axiosSecure.get(`/users/data/${user.email}`);
      const userData = response.data;

      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zapshift-data-${Date.now()}.json`;
      a.click();

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Download Complete!",
        text: "Your data has been downloaded",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to download data",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-2">
        <button
          className={`tab gap-2 ${
            activeTab === "notifications" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          <FaBell />
          <span className="hidden sm:inline">Notifications</span>
        </button>
        <button
          className={`tab gap-2 ${activeTab === "security" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          <FaLock />
          <span className="hidden sm:inline">Security</span>
        </button>
        <button
          className={`tab gap-2 ${activeTab === "privacy" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("privacy")}
        >
          <FaShieldAlt />
          <span className="hidden sm:inline">Privacy</span>
        </button>
        <button
          className={`tab gap-2 ${
            activeTab === "appearance" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("appearance")}
        >
          <FaPalette />
          <span className="hidden sm:inline">Appearance</span>
        </button>
        <button
          className={`tab gap-2 ${
            activeTab === "preferences" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          <FaGlobe />
          <span className="hidden sm:inline">Preferences</span>
        </button>
        <button
          className={`tab gap-2 ${activeTab === "account" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          <FaTrash />
          <span className="hidden sm:inline">Account</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <NotificationsTab
              settings={settings}
              onToggle={handleNotificationToggle}
            />
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <SecurityTab
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              showCurrentPassword={showCurrentPassword}
              setShowCurrentPassword={setShowCurrentPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              handlePasswordChange={handlePasswordChange}
              settings={settings}
              onToggle={handlePrivacyToggle}
            />
          )}

          {/* PRIVACY TAB */}
          {activeTab === "privacy" && (
            <PrivacyTab settings={settings} onToggle={handlePrivacyToggle} />
          )}

          {/* APPEARANCE TAB */}
          {activeTab === "appearance" && (
            <AppearanceTab
              settings={settings}
              onChange={handleAppearanceChange}
            />
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "preferences" && (
            <PreferencesTab
              settings={settings}
              onChange={handleAppearanceChange}
            />
          )}

          {/* ACCOUNT TAB */}
          {activeTab === "account" && (
            <AccountTab
              onDownloadData={handleDownloadData}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// NOTIFICATIONS TAB COMPONENT
const NotificationsTab = ({ settings, onToggle }) => {
  const notifications = settings.notifications || {
    emailOrderUpdates: true,
    emailDeliveryStatus: true,
    emailPromotions: false,
    smsOrderUpdates: false,
    smsDeliveryStatus: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

      {/* Email Notifications */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MdEmail className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Email Notifications</h3>
        </div>
        <div className="space-y-3">
          <SettingToggle
            label="Order Updates"
            description="Receive email updates about your orders"
            checked={notifications.emailOrderUpdates}
            onChange={(checked) => onToggle("emailOrderUpdates", checked)}
          />
          <SettingToggle
            label="Delivery Status"
            description="Get notified when your parcel is out for delivery"
            checked={notifications.emailDeliveryStatus}
            onChange={(checked) => onToggle("emailDeliveryStatus", checked)}
          />
          <SettingToggle
            label="Promotional Emails"
            description="Receive offers, discounts, and news"
            checked={notifications.emailPromotions}
            onChange={(checked) => onToggle("emailPromotions", checked)}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MdSms className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">SMS Notifications</h3>
        </div>
        <div className="space-y-3">
          <SettingToggle
            label="Order Updates"
            description="Receive SMS updates about your orders"
            checked={notifications.smsOrderUpdates}
            onChange={(checked) => onToggle("smsOrderUpdates", checked)}
          />
          <SettingToggle
            label="Delivery Status"
            description="Get SMS when your parcel is out for delivery"
            checked={notifications.smsDeliveryStatus}
            onChange={(checked) => onToggle("smsDeliveryStatus", checked)}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MdNotifications className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Push Notifications</h3>
        </div>
        <div className="space-y-3">
          <SettingToggle
            label="Browser Notifications"
            description="Receive push notifications in your browser"
            checked={notifications.pushNotifications}
            onChange={(checked) => onToggle("pushNotifications", checked)}
          />
          <SettingToggle
            label="Order Updates"
            description="Get instant notifications for order updates"
            checked={notifications.orderUpdates}
            onChange={(checked) => onToggle("orderUpdates", checked)}
          />
        </div>
      </div>
    </div>
  );
};

// SECURITY TAB COMPONENT
const SecurityTab = ({
  passwordData,
  setPasswordData,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handlePasswordChange,
  settings,
  onToggle,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      {/* Change Password */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaKey className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Change Password</h3>
        </div>
        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Current Password</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="input input-bordered w-full pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">New Password</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="input input-bordered w-full pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Confirm New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="input input-bordered w-full pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            className="btn btn-primary gap-2"
          >
            <FaSave />
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MdSecurity className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
        </div>
        <div className="space-y-3">
          <SettingToggle
            label="Enable 2FA"
            description="Add an extra layer of security to your account"
            checked={settings.security?.twoFactorEnabled || false}
            onChange={(checked) => onToggle("twoFactorEnabled", checked)}
          />
        </div>
      </div>

      {/* Session Management */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FaShieldAlt className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Active Sessions</h3>
        </div>
        <div className="alert alert-info">
          <span>You are currently logged in on 1 device</span>
          <button className="btn btn-sm btn-ghost">Sign out all devices</button>
        </div>
      </div>
    </div>
  );
};

// PRIVACY TAB COMPONENT
const PrivacyTab = ({ settings, onToggle }) => {
  const privacy = settings.privacy || {
    showProfile: true,
    showEmail: false,
    showPhone: false,
    showOrderHistory: true,
    dataCollection: true,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>

      <div className="space-y-4">
        <SettingToggle
          label="Public Profile"
          description="Allow others to see your profile information"
          checked={privacy.showProfile}
          onChange={(checked) => onToggle("showProfile", checked)}
        />
        <SettingToggle
          label="Show Email"
          description="Display your email address on your profile"
          checked={privacy.showEmail}
          onChange={(checked) => onToggle("showEmail", checked)}
        />
        <SettingToggle
          label="Show Phone Number"
          description="Display your phone number on your profile"
          checked={privacy.showPhone}
          onChange={(checked) => onToggle("showPhone", checked)}
        />
        <SettingToggle
          label="Show Order History"
          description="Allow order history to be visible to delivery partners"
          checked={privacy.showOrderHistory}
          onChange={(checked) => onToggle("showOrderHistory", checked)}
        />
        <SettingToggle
          label="Data Collection"
          description="Allow us to collect usage data to improve our service"
          checked={privacy.dataCollection}
          onChange={(checked) => onToggle("dataCollection", checked)}
        />
      </div>
    </div>
  );
};

// APPEARANCE TAB COMPONENT
const AppearanceTab = ({ settings, onChange }) => {
  const appearance = settings.appearance || {
    theme: "light",
    fontSize: "medium",
    compactMode: false,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>

      {/* Theme Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaPalette className="text-2xl text-primary" />
          <h3 className="text-xl font-semibold">Theme</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ThemeCard
            name="Light"
            theme="light"
            icon={<FaSun />}
            selected={appearance.theme === "light"}
            onClick={() => onChange("theme", "light")}
          />
          <ThemeCard
            name="Dark"
            theme="dark"
            icon={<FaMoon />}
            selected={appearance.theme === "dark"}
            onClick={() => onChange("theme", "dark")}
          />
          <ThemeCard
            name="Cupcake"
            theme="cupcake"
            selected={appearance.theme === "cupcake"}
            onClick={() => onChange("theme", "cupcake")}
          />
          <ThemeCard
            name="Corporate"
            theme="corporate"
            selected={appearance.theme === "corporate"}
            onClick={() => onChange("theme", "corporate")}
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Font Size</h3>
        <select
          className="select select-bordered w-full max-w-xs"
          value={appearance.fontSize}
          onChange={(e) => onChange("fontSize", e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Display Options */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Display Options</h3>
        <SettingToggle
          label="Compact Mode"
          description="Reduce spacing for a more compact layout"
          checked={appearance.compactMode}
          onChange={(checked) => onChange("compactMode", checked)}
        />
      </div>
    </div>
  );
};

// PREFERENCES TAB COMPONENT
const PreferencesTab = ({ settings }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Preferences</h2>

      <div className="space-y-6 max-w-md">
        {/* Language */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Language</span>
          </label>
          <select className="select select-bordered">
            <option value="en">English</option>
            <option value="bn">বাংলা (Bengali)</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Timezone</span>
          </label>
          <select className="select select-bordered">
            <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Date Format</span>
          </label>
          <select className="select select-bordered">
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        {/* Currency */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Currency</span>
          </label>
          <select className="select select-bordered">
            <option value="BDT">BDT (৳)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ACCOUNT TAB COMPONENT
const AccountTab = ({ onDownloadData, onDeleteAccount }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Management</h2>

      {/* Download Data */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Download Your Data</h3>
        <p className="text-gray-600 mb-4">
          Download a copy of all your data including orders, profile
          information, and activity history.
        </p>
        <button onClick={onDownloadData} className="btn btn-primary gap-2">
          <FaDownload />
          Download Data
        </button>
      </div>

      <div className="divider"></div>

      {/* Delete Account */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-error">Danger Zone</h3>
        <div className="alert alert-warning mb-4">
          <span>
            ⚠️ Once you delete your account, there is no going back. Please be
            certain.
          </span>
        </div>
        <button onClick={onDeleteAccount} className="btn btn-error gap-2">
          <FaTrash />
          Delete My Account
        </button>
      </div>
    </div>
  );
};

// REUSABLE COMPONENTS
const SettingToggle = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

const ThemeCard = ({ name, theme, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`card bg-base-100 border-2 hover:shadow-lg transition ${
        selected ? "border-primary" : "border-base-300"
      }`}
      data-theme={theme}
    >
      <div className="card-body p-4 items-center text-center">
        <div className="text-2xl mb-2">{icon || "🎨"}</div>
        <h4 className="font-semibold">{name}</h4>
        {selected && <div className="badge badge-primary badge-sm">Active</div>}
      </div>
    </button>
  );
};

export default Settings;
