import React from "react";
import { BsCheck2Circle, BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Document",
      basePrice: "60",
      description: "Fastest delivery for envelopes and letters.",
      features: ["Up to 0.5kg", "Next Day Delivery", "Real-time Tracking"],
      tag: "Small & Fast",
    },
    {
      name: "Standard Parcel",
      basePrice: "110",
      description: "Perfect for personal packages and small items.",
      features: ["Up to 3.0kg", "Fragile Handling", "Insurance Included"],
      tag: "Most Popular",
      featured: true,
    },
    {
      name: "Heavy/Bulk",
      basePrice: "110",
      extra: "+ ৳40/kg",
      description: "For big moves and enterprise logistics.",
      features: ["Over 3.0kg", "Bulk Discounts", "Dedicated Support"],
      tag: "Scalable",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12 lg:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
          Pricing Plans
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
          Simple, Transparent <br /> Rates.
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          No hidden fees. Whether it's across the street or across the country,
          we have a plan that fits.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-10 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-4 ${
              plan.featured
                ? "bg-secondary text-white shadow-2xl scale-105"
                : "bg-white text-secondary border border-gray-100"
            }`}
          >
            {plan.featured && (
              <span className="absolute top-6 right-8 bg-primary text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-tighter">
                {plan.tag}
              </span>
            )}

            <h3
              className={`text-2xl font-bold mb-4 ${plan.featured ? "text-primary" : "text-secondary"}`}
            >
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-lg">৳</span>
              <span className="text-5xl font-extrabold">{plan.basePrice}</span>
              {plan.extra && (
                <span className="text-sm opacity-60 ml-2">{plan.extra}</span>
              )}
            </div>
            <p
              className={`mb-8 ${plan.featured ? "text-gray-300" : "text-gray-500"}`}
            >
              {plan.description}
            </p>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <BsCheck2Circle
                    className={
                      plan.featured ? "text-primary" : "text-green-500"
                    }
                  />
                  <span className="text-sm font-medium">{feat}</span>
                </li>
              ))}
            </ul>
            <Link to="/sendParcel">
            <button
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.featured
                  ? "bg-primary text-white hover:bg-opacity-90"
                  : "bg-gray-100 text-secondary hover:bg-secondary hover:text-white"
              }`}
            >
              Book Delivery
            </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Extra Charge Info */}
      <div className="max-w-3xl mx-auto mt-20 p-8 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6 items-center">
        <div className="bg-white p-4 rounded-2xl text-blue-600 shadow-sm">
          <BsInfoCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-secondary">Note on Extra Charges</h4>
          <p className="text-sm text-gray-600 mt-1">
            Deliveries outside the home district incur an additional ৳40–50
            service fee. For parcels over 3kg, a convenience fee of ৳40 is
            applied to cover long-haul logistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
