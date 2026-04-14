import React from "react";
import liveTrack from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const Facilities = () => {
  const data = [
    {
      image: safeDelivery,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely. Our reliable process guarantees damage-free delivery every time.",
    },
    {
      image: liveTrack,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. Monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      image: safeDelivery, // Consider using a support-specific icon here if you have one!
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="my-8 md:my-12 lg:my-16 pb-8 md:pb-12 lg:pb-16 px-4 md:px-6">
      {/* Container with a subtle dashed divider theme */}
      <div className="space-y-8">
        {data.map((facility, index) => (
          <div
            key={index}
            className={`
              flex flex-col md:flex-row items-center gap-8 lg:gap-16
              p-6 md:p-10 rounded-[2rem] bg-white border border-gray-100
              hover:shadow-xl hover:shadow-primary/5 transition-all duration-300
              ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
            `}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                {/* Decorative background element */}
                <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl" />
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="relative w-24 md:w-36 lg:w-48 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Premium Facility
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4">
                {facility.title}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
                {facility.desc}
              </p>

              {/* Subtle divider for mobile only */}
              <div className="mt-8 border-b border-dashed border-gray-200 md:hidden" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
