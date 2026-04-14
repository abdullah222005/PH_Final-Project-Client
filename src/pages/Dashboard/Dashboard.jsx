import React, { useState } from "react";
import {
  User,
  Package,
  Truck,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  BarChart3,
} from "lucide-react";
import { useAuth } from "./hooks/useData";
import { NavItem, LoadingSpinner } from "./components/SharedComponents";
import AdminDashboard from "./components/AdminDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

// Login Screen Component
const LoginScreen = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Truck className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          Zap Shift Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Select a role to login (Demo Mode)
        </p>

        <div className="space-y-3">
          <button
            onClick={() =>
              onLogin({
                email: "admin@zapshift.com",
                displayName: "Admin User",
                role: "admin",
              })
            }
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Login as Admin
          </button>
          <button
            onClick={() =>
              onLogin({
                email: "rider@zapshift.com",
                displayName: "John Rider",
                role: "delivery",
              })
            }
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Truck className="w-5 h-5" />
            Login as Delivery Partner
          </button>
          <button
            onClick={() =>
              onLogin({
                email: "g.rabbi2005.555@gmail.com",
                displayName: "Customer User",
                role: "customer",
              })
            }
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            Login as Customer
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Demo Mode:</strong> This is using mock authentication. In
            production, integrate with Firebase Auth.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DeliveryDashboard = () => {
  const { currentUser, loading: authLoading, login, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");

  // Handle authentication loading
  if (authLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Show login screen if no user
  if (!currentUser) {
    return <LoginScreen onLogin={login} />;
  }

  // Determine which dashboard to render
  const renderDashboard = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard currentUser={currentUser} />;
      case "delivery":
        return <DeliveryDashboard currentUser={currentUser} />;
      case "customer":
        return <CustomerDashboard currentUser={currentUser} />;
      default:
        return <CustomerDashboard currentUser={currentUser} />;
    }
  };

  // Navigation items based on role
  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, text: "Dashboard", view: "dashboard" },
      { icon: Package, text: "Orders", view: "orders" },
      { icon: Settings, text: "Settings", view: "settings" },
    ];

    if (currentUser.role === "admin") {
      return [
        ...commonItems.slice(0, 2),
        { icon: Users, text: "Riders", view: "riders" },
        { icon: BarChart3, text: "Analytics", view: "analytics" },
        ...commonItems.slice(2),
      ];
    }

    return commonItems;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Truck className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold">Zap Shift</h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {getNavigationItems().map((item) => (
              <NavItem
                key={item.view}
                icon={item.icon}
                text={item.text}
                active={currentView === item.view}
                onClick={() => setCurrentView(item.view)}
              />
            ))}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 w-full p-6 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {currentUser.displayName || currentUser.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {currentUser.role}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser.displayName || currentUser.email}!
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {currentView === "dashboard" && renderDashboard()}
          {currentView === "orders" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Orders View</h2>
              <p className="text-gray-600">
                This section is under development. The dashboard view above
                shows your orders.
              </p>
            </div>
          )}
          {currentView === "riders" && currentUser.role === "admin" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Riders Management</h2>
              <p className="text-gray-600">
                Rider management is available in the main dashboard view above.
              </p>
            </div>
          )}
          {currentView === "analytics" && currentUser.role === "admin" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Analytics</h2>
              <p className="text-gray-600">
                Analytics dashboard coming soon...
              </p>
            </div>
          )}
          {currentView === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p className="text-gray-600">Settings page coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
