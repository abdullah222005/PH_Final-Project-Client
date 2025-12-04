import React from 'react';
import bannerBG from "../../../assets/be-a-merchant-bg.png";
import locationMerchant from "../../../assets/location-merchant.png";

const Banner = () => {
    return (
      <div className="bg-secondary rounded-3xl my-5 md:my-10 lg:my-15">
        <img src={bannerBG} alt="" />
        <div className='px-10 pb-10 flex flex-col md:flex-row gap-5'>
          <div className='text-white'>
            <h1 className='text-4xl font-semibold mb-5'>Merchant and Customer Satisfaction is Our First Priority</h1>
            <p>
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className='mt-5'>
              <button className='btn rounded-3xl bg-primary mr-5'>Become a Merchant</button>
              <button className='btn rounded-3xl bg-secondary text-primary border-primary'>Earn with ZapShift Courier</button>
            </div>
          </div>
          <img src={locationMerchant} alt="" />
        </div>
      </div>
    );
};

export default Banner;