import React from 'react';
import bannerBG from "../../../assets/be-a-merchant-bg.png";
import locationMerchant from "../../../assets/location-merchant.png";

const Banner = () => {
    return (
      <div className="relative bg-secondary rounded-3xl my-5 md:my-10 lg:my-15 pb-144 md:pb-80 lg:pb-55">
        <img src={bannerBG} alt="" />
        <div className='absolute top-11 px-10 pb-10 grid grid-cols-1 md:grid-cols-2 items-center gap-5'>
          <div className='text-white'>
            <h1 className='text-2xl md:text-4xl font-semibold mb-5'>Merchant and Customer Satisfaction is Our First Priority</h1>
            <p>
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className='mt-5 flex gap-5 items-center flex-col md:flex-row'>
              <button className='btn rounded-3xl bg-primary'>Become a Merchant</button>
              <button className='btn rounded-3xl  lg:py-2 bg-secondary text-primary border-primary'>Earn with ZapShift Courier</button>
            </div>
          </div>
          <img src={locationMerchant} alt="" />
        </div>
      </div>
    );
};

export default Banner;