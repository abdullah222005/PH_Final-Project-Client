import React from "react";
import vanIcon from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  const data = [
    {
      title: "Booking Pick & Drop",
      desc: "Instant pickup and delivery for your personal parcels with real-time tracking.",
    },
    {
      title: "Cash On Delivery",
      desc: "Secure payment collection at your doorstep with lightning-fast settlements.",
    },
    {
      title: "Delivery Hub",
      desc: "Strategically located sorting centers ensuring the fastest route for your goods.",
    },
    {
      title: "SME & Corporate",
      desc: "Tailored logistics solutions and bulk shipping for growing businesses.",
    },
  ];

  return (
      <div className="max-w-7xl mx-auto my-8 md:my-12 lg:my-16 px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight">
            How it <span className="text-primary">Works</span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Streamlining your logistics in four simple steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((info, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 p-8 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Step Number Badge */}
              <span className="absolute top-6 right-8 text-4xl font-bold text-gray-50 group-hover:text-primary/10 transition-colors">
                0{index + 1}
              </span>

              {/* Icon Container */}
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <img
                  src={vanIcon}
                  alt={info.title}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-secondary font-bold text-xl mb-3">
                {info.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {info.desc}
              </p>

              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-b-3xl transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
  );
};

export default HowItWorks;
