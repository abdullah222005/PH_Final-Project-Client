import React from "react";
import CountUp from "react-countup";

const TrustStats = () => {
  const stats = [
    { label: "Successful Deliveries", value: 1200000, suffix: "+" },
    { label: "Verified Riders", value: 4500, suffix: "" },
    { label: "Merchant Partners", value: 15000, suffix: "+" },
    { label: "Coverage Districts", value: 64, suffix: "" },
  ];

  return (
    <div className="px-4 md:px-6 my-16 md:my-24 lg:my-32 max-w-7xl mx-auto">
      <div className="bg-secondary p-12 shadow-2xl rounded-3xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-0" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                <CountUp end={stat.value} duration={3} separator="," />
                <span className="text-primary">{stat.suffix}</span>
              </h2>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStats;
