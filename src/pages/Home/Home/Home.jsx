import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from 'react-icons/fa';
import HeroBanner from '../../../components/Hero/HeroBanner';
import HowItWorks from '../How It Works/HowItWorks';
import OurServices from '../Our Services/OurServices';
import ServedBrands from '../Served Brands/ServedBrands';
import Reviews from '../Reviews/Reviews';
import Facilities from '../Facilities/Facilities';

const reviewsPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div className="">
            <HeroBanner/>      
            <HowItWorks/>     
            <OurServices/> 
            {/* <ServedBrands/> */}
            <Facilities/>
            <Reviews reviewsPromise={reviewsPromise}/>
        </div>
    );
};

export default Home;