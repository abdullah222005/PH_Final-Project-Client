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

const reviewsPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
            <HeroBanner/>      
            <HowItWorks/>     
            <OurServices/> 
            <ServedBrands/>
            <Facilities/>
            <Banner/>
            <Reviews reviewsPromise={reviewsPromise}/>
            <FAQ/>
        </div>
    );
};

export default Home;