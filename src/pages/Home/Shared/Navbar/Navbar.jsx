import React from "react";
import { Link, NavLink } from "react-router-dom";
import Home from "../../Home/Home";
import Logo from "../../../../components/logo/Logo";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

// Active link style function
const getLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? "#2563eb" : "", // Blue color when active
    borderBottom: isActive ? "2px solid #2563eb" : "none", // Underline when active
    paddingBottom: "2px",
  };
};

const Navbar = () => {
  const links = (
    // Navlinks Here 
    <>
      <li>
        <NavLink to="/services" style={getLinkStyle}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" style={getLinkStyle}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs" style={getLinkStyle}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" style={getLinkStyle}>
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/beArider" style={getLinkStyle}>
          Be a Rider
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </label>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>

          {/* Logo Here  */}
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-10">{links}</ul>
        </div>

        {/* Buttons here  */}
        <div className="navbar-end gap-5">
          <button className="btn rounded py-1">
            Sign In
          </button>
          <button className="btn hidden md:block bg-primary rounded py-1">
            Be a rider
          </button>
          <BsArrowUpRightCircleFill className="text-4xl -ml-4"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
