import reviewImg from '../../../assets/customer-top.png'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, {use, useRef, useState } from "react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import quoteImg from '../../../assets/reviewQuote.png'

const Reviews = ({reviewsPromise}) => {
    const reviewData = use(reviewsPromise);
        
    return (
      <div className="my-10 md:my-15 lg:my-20 lg:py-10">
        <img src={reviewImg} className="mx-auto mb-7" alt="" />
        <h1 className="text-2xl md:text-4xl text-center font-semibold text-secondary">
          What our customers are sayings
        </h1>
        <p className="text-center text-gray-700 mt-5 mb-10 max-w-203 mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={20}
            initialSlide={1}
            coverflowEffect={{
              rotate: 55,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            breakpoints={{
                0:{
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                }
            }}
          >
            {reviewData.map((review, index) => (
              <SwiperSlide
                key={index}
                className="bg-white rounded-3xl p-5 flex flex-col justify-between transition-transform duration-300"
              >
                <div className="flex justify-between mb-3">
                  <img src={quoteImg} alt="" />
                  <span className="text-xl bg-primary pt-2.5 px-4 rounded-3xl text-secondary">
                    {review.ratings}
                  </span>
                </div>
                <p>{review.review}</p>
                <span className="text-gray-500">
                  {review.date.split("T")[0]}
                </span>
                <div className="flex gap-3 my-5">
                  <img
                    className="w-11 h-11 rounded-full"
                    src={review.user_photoURL}
                    alt=""
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{review.userName}</h3>
                    <p className="text-gray-700 text-sm">
                      {review.user_email}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
};

export default Reviews;