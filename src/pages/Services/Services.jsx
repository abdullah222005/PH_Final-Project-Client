import React from "react";
import {
  BsTruck,
  BsShieldCheck,
  BsClockHistory,
  BsGlobe2,
  BsBoxSeam,
  BsHeadset,
} from "react-icons/bs";

const Services = () => {
  const mainServices = [
    {
      title: "Express Door-to-Door",
      desc: "Our flagship service. We pick up from your doorstep and deliver within the shortest possible time across the city.",
      icon: <BsTruck className="text-4xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Corporate Logistics",
      desc: "Tailored delivery solutions for SMEs and large corporations with dedicated account management and bulk pricing.",
      icon: <BsBoxSeam className="text-4xl" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Secure COD",
      desc: "Industry-leading Cash on Delivery service with lightning-fast payment settlements to keep your business cash flow healthy.",
      icon: <BsShieldCheck className="text-4xl" />,
      color: "bg-green-50 text-green-600",
    },
  ];

  const features = [
    {
      title: "Real-time Tracking",
      icon: <BsGlobe2 />,
      detail: "GPS enabled tracking for every mile.",
    },
    {
      title: "24/7 Support",
      icon: <BsHeadset />,
      detail: "Round-the-clock assistance for your peace of mind.",
    },
    {
      title: "Scheduled Pickup",
      icon: <BsClockHistory />,
      detail: "Book pickups at your preferred time slot.",
    },
  ];

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="bg-secondary py-8 md:py-12 lg:py-16 mb-8 md:mb-12 md:mb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Logistics Solutions for{" "}
          <span className="text-primary">Every Need</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          From micro-parcels to heavy enterprise shipments, Zapshift provides
          the infrastructure to move your world faster and safer.
        </p>
      </section>

      {/* Main Services Grid */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 lg:py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className="group p-10 rounded-[2.5rem] border border-gray-100 bg-base-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                {service.desc}
              </p>
              <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Bento Section */}
      <section className="py-8 md:py-12 lg:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary">
              Why Choose Zapshift?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm flex items-start gap-5 border border-transparent hover:border-primary/20 transition-all"
              >
                <div className="text-2xl text-primary bg-primary/10 p-4 rounded-xl">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary">
                    {feat.title}
                  </h4>
                  <p className="text-gray-500 mt-1">{feat.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 lg:py-16 px-6">
        <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Ready to start shipping?
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95">
                Create Account
              </button>
              <button className="bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                Get a Quote
              </button>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        </div>
      </section>
    </div>
  );
};

export default Services;