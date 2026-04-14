import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  BarChart3,
} from "lucide-react";

// Mock user data - replace with actual auth in your MERN app
const MOCK_USERS = {
  admin: {
    id: "1",
    name: "Admin User",
    role: "admin",
    email: "admin@delivery.com",
  },
  delivery: {
    id: "2",
    name: "John Driver",
    role: "delivery",
    email: "john@delivery.com",
  },
  customer: {
    id: "3",
    name: "Jane Customer",
    role: "customer",
    email: "jane@customer.com",
  },
};

// Mock data
const ORDERS = [
  {
    id: "1001",
    customer: "Jane Doe",
    address: "123 Main St",
    status: "pending",
    amount: 45.99,
    driver: null,
  },
  {
    id: "1002",
    customer: "John Smith",
    address: "456 Oak Ave",
    status: "in_transit",
    amount: 32.5,
    driver: "John Driver",
  },
  {
    id: "1003",
    customer: "Alice Brown",
    address: "789 Elm St",
    status: "delivered",
    amount: 67.25,
    driver: "John Driver",
  },
  {
    id: "1004",
    customer: "Bob Wilson",
    address: "321 Pine Rd",
    status: "pending",
    amount: 28.75,
    driver: null,
  },
];

const DRIVERS = [
  {
    id: "1",
    name: "John Driver",
    status: "active",
    deliveries: 45,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Sarah Courier",
    status: "active",
    deliveries: 52,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Mike Transporter",
    status: "offline",
    deliveries: 38,
    rating: 4.6,
  },
];

const DeliveryDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState(ORDERS);

  // Simulate login - replace with real auth
  useEffect(() => {
    setCurrentUser(MOCK_USERS.admin);
  }, []);

  const login = (role) => {
    setCurrentUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Truck className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">
            Delivery Dashboard
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Select a role to login
          </p>

          <div className="space-y-3">
            <button
              onClick={() => login("admin")}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Login as Admin
            </button>
            <button
              onClick={() => login("delivery")}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5" />
              Login as Delivery Partner
            </button>
            <button
              onClick={() => login("customer")}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Login as Customer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const AdminDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          title="Total Orders"
          value="234"
          color="blue"
          change="+12%"
        />
        <StatCard
          icon={Truck}
          title="Active Drivers"
          value="12"
          color="green"
          change="+2"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value="$12,450"
          color="indigo"
          change="+8%"
        />
        <StatCard
          icon={Clock}
          title="Avg. Delivery"
          value="28 min"
          color="orange"
          change="-5%"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.address}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ${order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drivers List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Partners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DRIVERS.map((driver) => (
            <div key={driver.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{driver.name}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    driver.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {driver.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Deliveries: {driver.deliveries}</p>
                <p>Rating: ⭐ {driver.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Delivery Partner Dashboard
  const DeliveryDashboard = () => {
    const myOrders = orders.filter(
      (o) => o.driver === currentUser.name || o.status === "pending",
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Delivery Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={Package}
            title="Today's Deliveries"
            value="8"
            color="green"
          />
          <StatCard
            icon={DollarSign}
            title="Earnings"
            value="$245"
            color="blue"
          />
          <StatCard
            icon={Clock}
            title="Hours Active"
            value="6.5"
            color="orange"
          />
        </div>

        {/* Available Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Available Orders</h3>
          <div className="space-y-3">
            {myOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Order #{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{order.address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-600">
                    ${order.amount}
                  </span>
                  {order.status === "pending" && (
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                      Accept Order
                    </button>
                  )}
                  {order.status === "in_transit" && (
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Customer Dashboard
  const CustomerDashboard = () => {
    const myOrders = orders.slice(0, 2);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>

        {/* Order Tracking */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Track Your Orders</h3>
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">Order #{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Order Placed</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{
                        width:
                          order.status === "pending"
                            ? "33%"
                            : order.status === "in_transit"
                              ? "66%"
                              : "100%",
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Amount:{" "}
                    <span className="font-semibold">${order.amount}</span>
                  </span>
                  {order.driver && (
                    <span className="text-gray-600">
                      Driver: {order.driver}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Order Button */}
        <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Place New Order
        </button>
      </div>
    );
  };

  // Render appropriate dashboard
  const renderDashboard = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard />;
      case "delivery":
        return <DeliveryDashboard />;
      case "customer":
        return <CustomerDashboard />;
      default:
        return <AdminDashboard />;
    }
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
          <div className="flex items-center gap-2 mb-8">
            <Truck className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold">DeliveryApp</h1>
          </div>

          <nav className="space-y-2">
            <NavItem icon={Home} text="Dashboard" active />
            <NavItem icon={Package} text="Orders" />
            {currentUser.role === "admin" && (
              <NavItem icon={Users} text="Drivers" />
            )}
            {currentUser.role === "admin" && (
              <NavItem icon={BarChart3} text="Analytics" />
            )}
            <NavItem icon={Settings} text="Settings" />
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentUser.name}</p>
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
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser.name}!
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">{renderDashboard()}</main>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon: Icon, title, value, color, change }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    indigo: "bg-indigo-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colors[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span
            className={`text-sm font-medium ${
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

const NavItem = ({ icon: Icon, text, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      active ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    in_transit: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  const labels = {
    pending: "Pending",
    in_transit: "In Transit",
    delivered: "Delivered",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default DeliveryDashboard;
