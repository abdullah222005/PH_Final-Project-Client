import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from 'react-icons/fa';
import HeroBanner from '../Hero/HeroBanner';
import HowItWorks from '../How It Works/HowItWorks';
import OurServices from '../Our Services/OurServices';
import ServedBrands from '../Served Brands/ServedBrands';
import Reviews from '../Reviews/Reviews';
import Facilities from '../Facilities/Facilities';
import Banner from '../Hero/Banner';
import FAQ from '../FAQ\'s/FAQ';
import TrustStats from '../trustStats/TrustStats';
import AppSection from '../AppSection/AppSection';

const reviewsPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
      <div>
        <HeroBanner />
        <div className="max-w-7xl mx-auto">
          <HowItWorks />
          <OurServices />
          <ServedBrands />
          <TrustStats/>
          <Facilities />
          <Banner />
          <Reviews reviewsPromise={reviewsPromise} />
          <FAQ />
          <AppSection/>
        </div>
      </div>
    );
};

export default Home;