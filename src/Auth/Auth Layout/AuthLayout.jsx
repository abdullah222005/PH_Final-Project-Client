import React from "react";
import Logo from "../../components/logo/Logo";
import authImg from "../../assets/authImage.png";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/Home/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 ml-5 md:ml-10 lg:ml-22">
          <Logo />
          <div className="-ml-2 mr-3 md:ml-5 lg:ml-22 max-w-[444px] mx-auto">
            <Outlet />
          </div>
        </div>
        <div className="bg-[#FAFDF0] flex justify-center items-center flex-1">
          <img src={authImg} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
