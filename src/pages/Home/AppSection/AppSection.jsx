import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import brand from "../../../assets/brand.png"

const AppSection = () => {
  return (
    <section className="max-w-7xl mx-auto my-8 md:my-12 lg:pt-16 px-4 md:px-6">
      <div className="bg-gray-50 rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden border border-gray-100">
        <div className="flex-1 text-center lg:text-left">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">
            Zapshift on the go
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-secondary mt-6 mb-8 leading-tight">
            Control your logistics <br />
            <span className="text-primary italic">from your pocket.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl">
            Track parcels in real-time, schedule pickups, and manage your
            merchant payments instantly with the Zapshift mobile app. Available
            for iOS and Android.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl hover:bg-black transition-all hover:scale-105">
              <FaApple size={28} />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-70">Download on</p>
                <p className="text-lg font-bold leading-none">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl hover:bg-black transition-all hover:scale-105">
              <FaGooglePlay size={24} />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-70">Get it on</p>
                <p className="text-lg font-bold leading-none">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          {/* Use a high-quality mockup image here */}
          <img
            src={brand}
            alt="Mobile App"
            className="w-full max-w-md mx-auto rounded-xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:rotate-2 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AppSection;