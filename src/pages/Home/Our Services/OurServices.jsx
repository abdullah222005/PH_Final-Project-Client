import React from "react";
import serviceLogo from "../../../assets/service.png";

const OurServices = () => {
  //Section's Data
  const data = [
    {
      title: "Express  & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="my-5 md:my-10 lg:my-15 bg-secondary rounded-2xl text-white p-10">
      <h1 className="text-4xl font-semibold mb-5 text-center">Our Services</h1>
      <p className="w-203 mx-auto text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {data.map((info, index) => (
          <div info={info} key={index} className="bg-white p-5 rounded-2xl text-center hover:bg-primary">
            <div className="bg-[#EEEDFC] w-15 h-15 rounded-full flex justify-center items-center mx-auto">
              <img src={serviceLogo} alt="" />
            </div>
            <h2 className="text-secondary font-semibold text-xl my-3">
              {info.title}
            </h2>
            <p className="text-gray-500">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
