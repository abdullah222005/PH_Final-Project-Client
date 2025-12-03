import React from 'react';
import vanIcon from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  //Section's Data
    const data = [
      {
        title: "Booking Pick & Drop",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
      },
      {
        title: "Cash On Delivery",
        desc: "From personal packages to business shipments — we deliver on time, every time."
      },
      {
        title: "Delivery Hub",
        desc: "From personal packages to business shipments — we deliver on time, every time."
      },
      {
        title: "Booking SME & Corporate",
        desc: "From personal packages to business shipments — we deliver on time, every time."
      }
    ];

    return (
      <div className='my-5 md:my-10 lg:my-15'>
        <h1 className="text-secondary text-4xl font-semibold mb-5">How it Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((info, index) => (
            <div key={index} info={info} className="bg-white p-5 rounded-2xl">
              <img src={vanIcon} alt="" />
              <h2 className="text-secondary font-semibold text-xl my-3">
                {info.title}
              </h2>
              <p className='text-gray-500'>{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default HowItWorks;