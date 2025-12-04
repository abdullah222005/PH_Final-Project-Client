import React from "react";
import liveTrack from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const Facilities = () => {
  const data = [
    {
      image: safeDelivery,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      image: liveTrack,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      image: safeDelivery,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];
  return (
    <div className="border-dashed border-y-2 border-secondary py-5 md:py-10 lg:py-15">
      {data.map((facility, index) => (
        <div
          key={index}
          className="flex gap-5 flex-col md:flex-row justify-center items-center my-5 bg-white p-4 rounded-2xl"
        >
          <img
            src={facility.image}
            alt=""
            className="border-dashed border-gray-500 border-b-2 lg:border-b-0 md:border-r-2 pb-7 md:pr-11"
          />
          <div>
            <h1 className="text-xl font-semibold text-secondary mb-5">
              {facility.title}
            </h1>
            <p>{facility.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
