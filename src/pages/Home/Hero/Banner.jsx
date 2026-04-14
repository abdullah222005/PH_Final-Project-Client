import React from 'react';
import bannerBG from "../../../assets/be-a-merchant-bg.png";
import locationMerchant from "../../../assets/location-merchant.png";

const Banner = () => {
    return (
      <section className="my-8 md:my-12 lg:my-16 px-4 md:px-6">
        <div className="relative bg-secondary rounded-xl pb-144 md:pb-80 lg:pb-55">
          <img src={bannerBG} alt="" />
          <div className="absolute top-11 px-10 pb-10 grid grid-cols-1 md:grid-cols-2 items-center gap-5">
            <div className="text-white">
              <h1 className="text-2xl md:text-4xl font-semibold mb-5">
                Merchant and Customer Satisfaction is Our First Priority
              </h1>
              <p>
                We offer the lowest delivery charge with the highest value along
                with 100% safety of your product. Pathao courier delivers your
                parcels in every corner of Bangladesh right on time.
              </p>
              <div className="mt-5 flex gap-5 items-center flex-col md:flex-row">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Become a Merchant - Primary Pulse Animation */}
                  <button
                    className="
      btn rounded-3xl bg-primary text-black border-none
      transition-all duration-300 ease-in-out
      hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]
      active:scale-95
      relative overflow-hidden group
    "
                  >
                    <span className="relative z-10">Become a Merchant</span>
                    {/* Subtle Shine Effect on Hover */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
                  </button>

                  {/* Earn with ZapShift - Ghost Border Animation */}
                  <button
                    className="
      btn rounded-3xl lg:py-2 bg-secondary text-primary border-2 border-primary
      transition-all duration-300 ease-in-out
      hover:bg-primary hover:text-secondary
      hover:shadow-lg hover:-translate-y-1
      active:translate-y-0 active:scale-95
    "
                  >
                    Earn with ZapShift Courier
                  </button>
                </div>
              </div>
            </div>
            <img src={locationMerchant} alt="" />
          </div>
        </div>
      </section>
    );
};

export default Banner;