import React from "react";
import {
  Package,
  Truck,
  Users,
  CreditCard,
  Star,
  Clock,
  MapPin,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import useRole from "../../hooks/useRole";
import { LoadingSpinner } from "../../components/Shared/SharedComponents";

// --- 1. ADMIN OVERVIEW ---
const AdminOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-2xl font-bold text-secondary">System Statistics</h1>
        <p className="text-gray-500">
          Overview of ZapShift operations and revenue.
        </p>
      </header>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="৳128,450"
          growth="+12.5%"
          icon={CreditCard}
        />
        <StatCard
          title="Total Parcels"
          value="4,820"
          growth="+8.2%"
          icon={Package}
        />
        <StatCard
          title="Registered Riders"
          value="156"
          growth="+12"
          icon={Truck}
        />
        <StatCard
          title="Total Customers"
          value="2.4k"
          growth="+18%"
          icon={Users}
        />
      </div>

      {/* Recent Global Activity Table */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-secondary">
            Recent Transactions
          </h3>
          <button className="text-sm font-bold text-secondary hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                <th className="rounded-l-xl">Tracking ID</th>
                <th>Sender</th>
                <th>District</th>
                <th>Cost</th>
                <th className="rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="font-mono text-xs py-4">ZAP-20260419-8A301C</td>
                <td className="font-semibold">MD. GOLAM RABBI</td>
                <td>Gazipur</td>
                <td className="font-bold">৳80</td>
                <td>
                  <span className="badge badge-success bg-primary text-secondary border-none font-bold badge-sm">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 2. RIDER OVERVIEW ---
const RiderOverview = ({ user }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-secondary p-8 rounded-[2rem] text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Hello, {user.displayName}! 👋</h1>
          <p className="text-gray-300 mt-2">
            You have 5 parcels to deliver in your zone today.
          </p>
        </div>
        <Truck className="absolute -right-10 -bottom-10 size-64 text-white/5 -rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Deliveries List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
            <Clock className="text-primary" size={20} /> Current Tasks
          </h3>
          <div className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="text-[10px] text-gray-400 font-mono mb-1">
                ID: ZAP-20251208-04A329
              </p>
              <h4 className="font-bold text-secondary text-lg">
                Watermelon (12kg)
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={14} /> Gazipur
                </p>
                <span className="text-gray-300">|</span>
                <p className="text-sm text-gray-500">To: Lalmonirhat</p>
              </div>
            </div>
            <button className="btn bg-secondary text-white hover:bg-black border-none px-6">
              Deliver
            </button>
          </div>
        </div>

        {/* Rider Performance Stats */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-secondary">Your Rating</h3>
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Star className="text-primary fill-primary" size={32} />
            </div>
            <h4 className="text-4xl font-black text-secondary">4.9</h4>
            <p className="text-gray-400 text-sm mt-1">Excellent Performance</p>
            <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-2">
              <div>
                <p className="text-xl font-bold text-secondary">142</p>
                <p className="text-[10px] text-gray-400 uppercase">Delivered</p>
              </div>
              <div className="border-l border-gray-50">
                <p className="text-xl font-bold text-secondary">৳12,400</p>
                <p className="text-[10px] text-gray-400 uppercase">Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. CUSTOMER OVERVIEW ---
const CustomerOverview = ({ role }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Welcome Back!</h1>
          <p className="text-gray-500">Track your ongoing shipments here.</p>
        </div>
        <button className="btn bg-primary text-secondary border-none font-bold px-8 rounded-xl hover:scale-105 transition-transform">
          + New Booking
        </button>
      </div>

      {/* Customer Parcel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group hover:border-primary transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Package className="text-secondary" size={24} />
            </div>
            <span className="badge bg-green-100 text-green-700 border-none font-bold">
              PAID
            </span>
          </div>

          <h3 className="font-bold text-lg text-secondary">Watermelon</h3>
          <p className="text-[10px] text-gray-400 font-mono mb-4">
            ZAP-20251208-04A329
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-gray-600">
                Status: <b className="text-secondary">Pending-Pickup</b>
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin size={16} />
              <span>To: Lalmonirhat</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-secondary text-white font-bold opacity-90 hover:opacity-100 transition-opacity">
            Track Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SHARED STAT CARD ---
const StatCard = ({ title, value, growth, icon: Icon }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 group hover:border-primary/50 transition-all cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-primary/20 transition-all">
        <Icon size={24} className="text-secondary" />
      </div>
      <div className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
        <TrendingUp size={12} className="mr-1" /> {growth}
      </div>
    </div>
    <p className="text-gray-400 text-sm font-medium">{title}</p>
    <h3 className="text-3xl font-black text-secondary mt-1">{value}</h3>
  </div>
);

// --- MAIN DASHBOARD HOME COMPONENT ---
const DashboardHome = () => {
  const { role, isLoading, user } = useRole();
  console.log(role);
  
  if (isLoading) return <LoadingSpinner fullScreen />;
  if (!user)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 font-medium">
          Authentication required. Please log in.
        </p>
      </div>
    );

  return (
    <div className="">
      {role === "admin" && <AdminOverview user={user} />}
      {role === "delivery" && <RiderOverview user={user} />}
      {role === "user" && <CustomerOverview user={user} />}
    </div>
  );
};

export default DashboardHome;
