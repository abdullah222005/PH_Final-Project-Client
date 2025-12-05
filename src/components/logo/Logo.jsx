import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/' className='flex items-end py-2'>
            <img src={logo} alt="" />
            <h1 className='font-semibold text-3xl -ms-2.5'>ZapShift</h1>
        </Link>
    );
};

export default Logo;