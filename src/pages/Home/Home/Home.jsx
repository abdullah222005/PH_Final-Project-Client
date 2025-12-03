import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from 'react-icons/fa';
import HeroBanner from '../../../components/Hero/HeroBanner';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div className="">
            <HeroBanner/>      
            <HowItWorks/>      
        </div>
    );
};

export default Home;