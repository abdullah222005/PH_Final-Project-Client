import React from 'react';
import Marquee from "react-fast-marquee";
import amazon from '../../../assets/brands/amazon.png'
import amazonVector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import startPeople from '../../../assets/brands/start_people.png'

const brandLogos = [amazon, amazonVector, casio, moonstar, randstad, star, startPeople]

const ServedBrands = () => {
    return (
      <div className="my-5 md:my-10 lg:my-15 pb-10 lg:pb-20">
        <h1 className="text-4xl font-semibold text-secondary my-15 lg:my-20 text-center">
          We've helped thousands of sales teams
        </h1>
        <div className="w-full overflow-hidden">
          <Marquee
            pauseOnHover={false}
            speed={111}
            delay={0}
            loop={0}
            className="w-full"
          >
            {brandLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                className="mx-10 h-10 object-contain"
              />
            ))}
          </Marquee>
        </div>
      </div>
    );
};

export default ServedBrands;