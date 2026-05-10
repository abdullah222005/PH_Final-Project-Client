import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BaggageClaim,
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import {
  MdHistoryEdu,
  MdDocumentScanner,
  MdDeliveryDining,
} from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import Logo from "../components/logo/Logo";
import useAuth from '../hooks/useAuth'
import toast from "react-hot-toast";

const DashLayout = () => {
  const {logOutUser} = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser()
    .then(res=>{
      // console.log(res);
      toast.success("Log Out Successful..!");
      navigate('/');
    })
    .then(err=>{
      // console.log(err);
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Modern Professional Navbar */}
          <nav className="navbar w-full bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost text-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="flex-1">
              <h2 className="text-secondary font-bold text-xl hidden md:block">
                <span className="text-gray-400 font-normal">Dashboard</span>
              </h2>
            </div>

            <div className="flex gap-4 items-center">
              {/* Notification Bell */}
              <button className="btn btn-ghost btn-circle text-secondary">
                <div className="indicator">
                  <Bell size={20} />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>

              {/* User Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-primary"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-100 text-secondary"
                >
                  <li>
                    <a href="my-profile">Profile</a>
                  </li>
                  <li>
                    <a href="settings">Settings</a>
                  </li>
                  <li className="text-red-500">
                    <button onClick={handleLogOut}>
                      <LogOut size={15} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="bg-[#EAECED]">
            <div className="max-w-full min-h-screen mx-auto p-4 md:p-6 lg:pr-2 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar Redesign */}
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col w-64 md:w-72 bg-secondary text-white">
            {/* Sidebar Header/Logo */}
            <div className="border-b border-white/10">
              <div className="flex justify-center">
                <Logo />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col grow p-4">
              <ul className="menu menu-md lg:menu-lg w-full gap-2">
                <li className="menu-title text-gray-400 uppercase text-xs tracking-widest mt-4">
                  Main Menu
                </li>

                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-primary text-secondary font-bold shadow-lg shadow-primary/20" : "hover:bg-white/10"}`
                    }
                  >
                    <Home size={20} />
                    <span>Homepage</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-primary text-secondary font-bold shadow-lg shadow-primary/20" : "hover:bg-white/10"}`
                    }
                  >
                    <LayoutDashboard size={20} />
                    <span>Overview</span>
                  </NavLink>
                </li>

                <li className="menu-title text-gray-400 uppercase text-xs tracking-widest mt-4">
                  Management
                </li>

                {[
                  {
                    to: "/dashboard/my-parcels",
                    icon: <BaggageClaim size={20} />,
                    label: "My Parcels",
                  },
                  {
                    to: "/dashboard/payment-history",
                    icon: <MdHistoryEdu size={22} />,
                    label: "Payment History",
                  },
                  {
                    to: "/dashboard/riders-applications",
                    icon: <MdDocumentScanner size={20} />,
                    label: "Rider Applications",
                  },
                  {
                    to: "/dashboard/users-management-system",
                    icon: <FaUsersGear size={20} />,
                    label: "Users System",
                  },
                  {
                    to: "/dashboard/assign-riders",
                    icon: <MdDeliveryDining size={22} />,
                    label: "Assign Riders",
                  },
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-primary text-secondary font-bold shadow-lg shadow-primary/20" : "hover:bg-white/10"}`
                      }
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Bottom Sidebar Actions */}
              <div className="mt-auto pt-10">
                <ul className="menu gap-2 border-t border-white/10 pt-4 w-full">
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center justify-center gap-4 px-4 py-3 text-red-400 bg-red-500/25 hover:bg-red-500/50 hover:text-white rounded-xl transition-all"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
