import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
  const data = [
    {
      ques: "How does this posture corrector work?",
      ans: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      ques: "Is it suitable for all ages and body types?",
      ans: "Yes, it is designed to comfortably fit most ages and body types, offering adjustable features for personalized use.",
    },
    {
      ques: "Does it really help with back pain and posture improvement?",
      ans: "Yes, with consistent use, it can provide noticeable relief from back pain and help improve posture by encouraging proper alignment.",
    },
    {
      ques: "Does it have smart features like vibration alerts?",
      ans: "Yes, it includes smart vibration alerts that activate when your posture slouches, helping you maintain proper form throughout the day.",
    },
    {
      ques: "How will I be notified when the product is back in stock?",
      ans: "You will receive an email or SMS notification as soon as the product becomes available again, depending on the contact method you choose.",
    },
  ];

  const toggleFAQ =(index)=>{
    setOpenIndex(openIndex === index ? null : index);
  }
  return (
    <div className="my-5 md:my-10 lg:my-15">
      <h1 className="text-4xl mb-5 text-center text-secondary">
        Frequently Asked Question (FAQ)
      </h1>
      <p className="text-center text-gray-700">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <div className="my-5 md:my-10 lg:my-15">
        {data.map((faq, index) => (
          <div
            key={index}
            className={`my-5 ${
              openIndex === index
                ? "bg-[#E6F2F3] border-2 border-[#5BA6AE] rounded-xl"
                : ""
            }`}
          >
            <h1
              className={`flex justify-between text-secondary text-xl ${
                openIndex !== index ? "bg-white" : "border-b-2 border-gray-500"
              }  p-5 rounded-xl font-semibold`}
            >
              {faq.ques}{" "}
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              />
            </h1>
            {openIndex === index && (
              <p className="p-5 text-gray-600">{faq.ans}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
