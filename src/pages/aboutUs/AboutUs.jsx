import React from "react";
import { BsLightningCharge, BsShieldCheck, BsPeople } from "react-icons/bs";
import brand from "../../assets/brand.png"
const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Moving Bangladesh <br />
            <span className="text-primary font-serif italic">
              Faster than ever.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Zapshift is more than a courier service. We are the backbone of your
            business and the bridge to your loved ones, delivering across all 64
            districts with unmatched precision.
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-20" />
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 lg:py-16 mt-8 md:mt-12 lg:mt-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Active Districts", value: "64" },
            { label: "Delivery Partners", value: "2.5k+" },
            { label: "Parcels Delivered", value: "1M+" },
            { label: "Success Rate", value: "99.9%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100 transition-hover hover:shadow-lg"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-2">
                {stat.value}
              </h2>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
            Our Purpose
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            Redefining Logistics through Technology.
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            We started with a simple goal: to eliminate the uncertainty of
            delivery. By integrating real-time tracking, secure payments, and a
            vast network of dedicated riders, we make logistics invisible so you
            can focus on what matters.
          </p>
          <div className="space-y-4">
            {[
              {
                icon: <BsLightningCharge />,
                text: "Instant Pickup & Delivery",
              },
              { icon: <BsShieldCheck />, text: "Zero-Risk Insurance Policy" },
              { icon: <BsPeople />, text: "Merchant-First Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-secondary font-bold"
              >
                <span className="p-2 bg-primary/10 text-primary rounded-lg">
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gray-200 rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
            <img
              src={brand}
              alt="Zapshift Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-3xl -rotate-6 -z-10" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
